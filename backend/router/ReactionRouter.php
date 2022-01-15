<?php

return function ($path, $app) {
    $app->group($path, function () use ($app) {
        $app->get('/post/{id_post}/reactions', 'ReactionController:get');
        $app->post('/post/{id_post}/reaction', 'ReactionController:create');
        $app->delete('/post/{id_post}/reaction', 'ReactionController:delete');
        // $app->get('/post/{id}', 'PostController:getOne');
        // $app->put('/post/{id}', 'PostController:update');
    });
};
