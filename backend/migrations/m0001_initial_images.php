<?php

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

class m0001_initial_images
{
    public function up()
    {
        $dsn = $_ENV['DB_DSN'] ?? '';
        $user = $_ENV['DB_USER'] ?? '';
        $password = $_ENV['DB_PASSWORD'] ?? '';

        $db = new \PDO($dsn, $user, $password);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $SQL = "
            CREATE TABLE IF NOT EXISTS Images (
                id_img INT AUTO_INCREMENT PRIMARY KEY,
                id_post INT,
                id_cmt INT,
                imgUrl varchar(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=INNODB;
        ";

        $db->exec($SQL);
    }

    public function down()
    {
        $dsn = $_ENV['DB_DSN'] ?? '';
        $user = $_ENV['DB_USER'] ?? '';
        $password = $_ENV['DB_PASSWORD'] ?? '';

        $db = new \PDO($dsn, $user, $password);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $SQL = "DROP TABLE Images";

        $db->exec($SQL);
    }
}
