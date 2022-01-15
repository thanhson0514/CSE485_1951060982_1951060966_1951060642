<?php
return function ($container) {
    $container["PostController"] = function () {
        return new \app\controllers\PostController;
    };

    $container["CommentController"] = function () {
        return new \app\controllers\CommentController;
    };

    $container["ReactionController"] = function () {
        return new \app\controllers\ReactionController;
    };

    $container["AuthController"] = function () {
        return new \app\controllers\AuthController;
    };

    $container['errorHandler'] = function ($container) {
        return function ($request, $response, $exception) use ($container) {
            $data = [
                'success' => false,
                'status_code' => 500,
                'code' => $exception->getCode(),
                'message' => $exception->getMessage()
            ];

            return $container->get('response')
                ->withStatus(500)
                ->withHeader('Content-Type', 'application/json')
                ->write(json_encode($data));
        };
    };
};
