<?php

use Firebase\JWT\JWT;
use app\models\User;

return function ($app) {
    $app->add(new \Tuupola\Middleware\JwtAuthentication([
        "ignore" => ["/auth/login", "/auth/register", "/api/v0/posts", "/api/v0/post/(\d*)/comments", "/api/v0/post/(\d*)/reactions"],
        "secure" => false,
        "secret" => $_ENV['JWT_SECRET_KEY'],
        "before" => function ($req, $args) {
            $token = explode(' ', $req->getHeader('Authorization')[0])[1];
            $decode = JWT::decode($token, $_ENV['JWT_SECRET_KEY'], ['HS256']);

            $User = new User();

            $stmt = $User->where('email', 'LIKE', $decode->jti)->first();

            if ($stmt === NULL) {
                throw new Error();
            }

            return $req->WithAttribute('id_user', $decode->id);
        },
        "error" => function ($response, $arguments) {
            $data["success"] = false;
            $data["response"] = $arguments["message"];
            $data["status_code"] = "401";

            $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
            return $response->withHeader("Content-type", "application/json");
        }
    ]));

    $app->add(function ($req, $res, $next) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type,Authorization");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Max-Age: 3600");
        header('Content-Type: application/json');

        $response = $next($req, $res);
        return $response->withHeader("Access-Control-Allow-Origin", "*")
            ->withHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
            ->withHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
            ->withHeader("Access-Control-Allow-Credentials", "true");
    });
};
