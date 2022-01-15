
<?php

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

class m0002_add_fk_reaction_post
{
    public function up()
    {
        $dsn = $_ENV['DB_DSN'] ?? '';
        $user = $_ENV['DB_USER'] ?? '';
        $password = $_ENV['DB_PASSWORD'] ?? '';

        $db = new \PDO($dsn, $user, $password);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $SQL = "
            ALTER TABLE Reaction
            ADD CONSTRAINT FK_ReactionPost
            FOREIGN KEY (id_post) REFERENCES Post(id_post);
        ";

        $db->exec($SQL);
    }
}
