<?php

$database_config = [
    "driver" => $_ENV['DB_DRIVER'],
    "host" => $_ENV['DB_HOST'],
    "database" => $_ENV['DB_NAME'],
    "username" => $_ENV['DB_USER'],
    "password" => $_ENV['DB_PASSWORD'],
    "charset" => $_ENV['DB_CHARSET'],
    "collation" => $_ENV['DB_COLLATION'],
    "prefix" => $_ENV['DB_PREFIX']
];

$capsule = new \Illuminate\Database\Capsule\Manager;

$capsule->addConnection($database_config);

$capsule->setAsGlobal();

$capsule->bootEloquent();

return $capsule;
