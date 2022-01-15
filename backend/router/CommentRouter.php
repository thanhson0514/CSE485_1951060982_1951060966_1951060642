<?php

return function ($path, $app) {
    $app->group($path, function () use ($app) {
        $app->get('/post/{id_post}/comments', 'CommentController:get');
        $app->post('/post/{id_post}/comment', 'CommentController:create');
        $app->put('/post/{id_post}/comment/{id_cmt}', 'CommentController:update');
        $app->delete('/post/{id_post}/comment/{id_cmt}', 'CommentController:delete');
        // $app->get('/post/{id}', 'PostController:getOne');
    });
};
