<?php

include_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$dsn = $_ENV['DB_DSN'] ?? '';
$user = $_ENV['DB_USER'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';

$pdo = new \PDO($dsn, $user, $password);
$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

$statement = $pdo->prepare("SHOW TABLES LIKE 'migrations';");
$statement->execute();

$appliedMigrations = $statement->fetchAll(\PDO::FETCH_COLUMN);
if (!count($appliedMigrations)) {
    echo '[' . date('Y-m-d H:i:s') . '] - ' . "All tables is drop!" . PHP_EOL;
    die;
}

$files = scandir(__DIR__ . '/migrations');

foreach ($files as $migration) {
    if ($migration === '.' || $migration === '..') {
        continue;
    }

    require_once __DIR__ . '/migrations/' . $migration;
    $className = pathinfo($migration, PATHINFO_FILENAME);

    if (strpos($className, 'm0001') === 0) {
        $instance = new $className();
        echo '[' . date('Y-m-d H:i:s') . '] - ' . "Droping migration $migration" . PHP_EOL;
        $instance->down();
        echo '[' . date('Y-m-d H:i:s') . '] - ' . "Droped migration $migration" . PHP_EOL;
    }
}

$statement = $pdo->prepare("DROP TABLE migrations");

$statement->execute();
