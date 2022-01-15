<?php

return function ($path, $app) {
    $app->group($path, function () use ($app) {
        $app->get('/load', 'AuthController:loadAuth');
        $app->get('/logout', 'AuthController:logout');
        $app->post('/login', 'AuthController:login');
        $app->post('/register', 'AuthController:register');
        $app->get('/user', 'AuthController:getUser');
    });
};
