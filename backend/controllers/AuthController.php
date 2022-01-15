<?php

namespace app\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use \Firebase\JWT\JWT;
use app\controllers\CustomResponse;
use app\models\Post;
use app\models\User;

class AuthController
{
    private $customResponse;
    public function __construct()
    {
        $this->customResponse = new CustomResponse();
    }

    public function loadAuth(Request $req, Response $res)
    {
        $User = new User();
        $id_user = $req->getAttribute('id_user');

        $find = $User->select('id_user', 'username', 'avatar', 'email', 'token')->where('id_user', '=', $id_user)->first();

        if ($find === NULL) {
            return $this->customResponse->is500Response($res, 'Lỗi hệ thống!');
        }

        $token = json_decode($find)->token;
        if (!$token) {
            return $this->customResponse->is401Response($res, 'Lỗi xác thực');
        }

        $decode = JWT::decode($token, $_ENV['JWT_SECRET_KEY'], ['HS256']);

        $User = new User();
        $cmp = $User->where('id_user', '=', $decode->id)->count();

        if (!$cmp) {
            return $this->customResponse->is401Response($res, 'Lỗi xác thực');
        }

        return $this->customResponse->is200Response($res, $find);
    }

    public function getUser(Request $req, Response $res, $args)
    {
        $id_user = $req->getAttribute('id_user');
        $Post = new Post();
        $User = new User();

        $queryPost = $User
            ->join('Post', 'Post.id_user', '=', 'User.id_user')
            ->where('User.id_user', '=', $id_user)
            ->select('Post.*')
            ->get();

        $queryUser = $User
            ->where('id_user', '=', $id_user)
            ->select('username', 'avatar')->first();

        $data = clone $queryUser;
        $data['posts'] = json_decode($queryPost);

        return $this->customResponse->is200Response($res, $data);
    }

    public function login(Request $req, Response $res)
    {
        $body = $req->getParsedBody();
        $email = $body['email'];
        $password = $body['password'];
        $User = new User();

        $where = $User->where('email', 'like', $email)->first();

        if ($where === NULL) {
            return $this->customResponse->is400Response($res, "Tên tài khoản hoặc mật khẩu không chính xác");
        }

        $hashPassword = $where->password;

        if (!password_verify($password, $hashPassword)) {
            return $this->customResponse->is400Response($res, "Tên tài khoản hoặc mật khẩu không chính xác");
        }

        $now = time();
        $future = strtotime('+2 hour', $now);
        $secret = $_ENV['JWT_SECRET_KEY'];

        $payload = [
            "id" => $where->id_user,
            "jti" => $where->email,
            "iat" => $now,
            "exp" => $future
        ];

        $encode = JWT::encode($payload, $secret, 'HS256');
        $User->where('email', 'LIKE', $email)->update(['token' => $encode]);

        $expirationMinutes = 10;
        $expiry = new \DateTimeImmutable('now + ' . $expirationMinutes . 'minutes');
        $cookie = urlencode('auth') . '=' .
            urlencode($encode) . '; expires=' . $expiry->format(\DateTime::COOKIE) . '; Max-Age=' .
            $expirationMinutes * 60 . '; path=/; secure; httponly';
        setCookie('cookie', $cookie);



        return $this->customResponse->is200Response($res, $encode);
    }

    public function register(Request $req, Response $res)
    {
        $body = $req->getParsedBody();
        $firstName = $body['firstName'];
        $lastName = $body['lastName'];
        $email = $body['email'];
        $password = $body['password'];

        $User = new User();
        $checkUser = $User->where('email', 'like', $email)->count();

        if ($checkUser > 0) {
            return $this->customResponse->is400Response($res, 'Tài khoản đã tồn tại');
        }

        $username = $lastName . ' ' . $firstName;
        $hashPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

        $User->username = $username;
        $User->email = $email;
        $User->password = $hashPassword;
        $User->avatar = 'default-user.png';
        $User->save();

        $now = time();
        $future = strtotime('+2 hour', $now);
        $secret = $_ENV['JWT_SECRET_KEY'];

        $payload = [
            "id" => $User->id,
            "jti" => $email,
            "iat" => $now,
            "exp" => $future
        ];

        $encode = JWT::encode($payload, $secret, 'HS256');
        $User->where('id_user', '=', $User->id)->update(['token' => $encode]);

        return $this->customResponse->is200Response($res, $encode);
    }

    public function logout(Request $req, Response $res)
    {
        $id_user = $req->getAttribute('id_user');
        $User = new User();
        $User->where('id_user', '=', $id_user)->update(['token' => null]);
        return $this->customResponse->is200Response($res, 'Đăng xuất');
    }
}
