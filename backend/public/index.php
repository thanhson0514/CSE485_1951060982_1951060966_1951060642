<?php

use Slim\App;

include_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$settings = require_once __DIR__ . '/../config/settings.php';
$routeContainers = require_once __DIR__ . '/../config/routerContainer.php';
$postRouter = require_once __DIR__ . '/../router/postRouter.php';
$authRouter = require_once __DIR__ . '/../router/authRouter.php';
$commentRouter = require_once __DIR__ . '/../router/CommentRouter.php';
$reactionRouter = require_once __DIR__ . '/../router/ReactionRouter.php';

$midleware = require_once __DIR__ . '/../config/middleware.php';
require_once __DIR__ . '/../config/database.php';

$app = new App($settings);
$container = $app->getContainer();

$routeContainers($container);

$midleware($app);
$postRouter('/api/v0', $app);
$commentRouter('/api/v0', $app);
$reactionRouter('/api/v0', $app);
$authRouter('/auth', $app);

$app->run();
