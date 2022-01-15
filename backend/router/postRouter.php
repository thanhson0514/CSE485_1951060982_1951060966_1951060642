<?php

return function ($path, $app) {
    $app->group($path, function () use ($app) {
        $app->get('/posts', 'PostController:get');
        $app->post('/post', 'PostController:create');
        // $app->get('/posts/{id}', 'PostController:getOne');
        $app->put('/post/{id}', 'PostController:update');
        $app->delete('/post/{id}', 'PostController:delete');
    });
};
