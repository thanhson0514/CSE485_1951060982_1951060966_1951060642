<?php

include_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$dsn = $_ENV['DB_DSN'] ?? '';
$user = $_ENV['DB_USER'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';

$pdo = new \PDO($dsn, $user, $password);
$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

$pdo->exec("
    CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=INNODB;
");

$statement = $pdo->prepare("SELECT migration FROM migrations;");
$statement->execute();

$appliedMigrations = $statement->fetchAll(\PDO::FETCH_COLUMN);

$files = scandir(__DIR__ . '/migrations');

$toApplyMigrations = array_diff($files, $appliedMigrations);
$newMigrations = [];

foreach ($toApplyMigrations as $migration) {
    if ($migration === '.' || $migration === '..') {
        continue;
    }

    require_once __DIR__ . '/migrations/' . $migration;
    $className = pathinfo($migration, PATHINFO_FILENAME);

    $instance = new $className();

    echo '[' . date('Y-m-d H:i:s') . '] - ' . "Applying migration $migration" . PHP_EOL;

    $instance->up();
    echo '[' . date('Y-m-d H:i:s') . '] - ' . "Applied migration $migration" . PHP_EOL;

    $newMigrations[] = $migration;
}

if (!empty($newMigrations)) {
    function m($m){
        return "('$m')";
    }
    $str = implode(',', array_map("m", $newMigrations));
    $statement = $pdo->prepare("
            INSERT INTO migrations (migration) VALUES
            $str
        ");

    $statement->execute();
} else {
    echo '[' . date('Y-m-d H:i:s') . '] - ' . "All migration are applied!" . PHP_EOL;
}
