<?php

namespace app\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use app\controllers\CustomResponse;

use app\models\Post;
use app\models\User;
use app\models\Reaction;


class ReactionController
{
    private $customResponse;
    public function __construct()
    {
        $this->customResponse = new CustomResponse();
    }

    public function get(Request $req, Response $res, $args)
    {
        $id_post = (int)$args['id_post'];
        $id_user = $req->getAttribute('id_user');

        $Post = new Post();
        $Reaction = new Reaction();

        $count = $Post->where('id_post', '=', $id_post)->count();

        if (!$count) {
            return $this->customResponse->is404Response($res, 'The post is not found!');
        }

        $reactions = $Reaction->where('id_post', '=', $id_post)->select('Reaction.id_user')->get();
        $list_id_users = [];

        foreach ($reactions as $reaction) {
            array_push($list_id_users, $reaction['id_user']);
        }

        return $this->customResponse->is200Response($res, $list_id_users);
    }

    public function create(Request $req, Response $res, $args)
    {
        $body = $req->getParsedBody();
        $id_post = $args['id_post'];
        $id_user = $req->getAttribute('id_user');

        $typeName = isset($body['typeName']) || '';

        $Post = new Post();
        $Reaction = new Reaction();

        $count = $Post->where('id_post', '=', $id_post)->count();
        if (!$count) {
            return $this->customResponse->is404Response($res, 'The post is not found!');
        }

        $Reaction->id_post = $id_post;
        $Reaction->id_user = $id_user;
        $Reaction->typeName = $typeName;

        $Reaction->save();

        return $this->customResponse->is201Response($res, $Reaction);
    }

    public function delete(Request $req, Response  $res, $args)
    {
        $id_post = $args['id_post'];
        $id_user = $req->getAttribute('id_user');
        $Reaction = new Reaction();
        $match = ['id_user' => $id_user, 'id_post' => $id_post];

        $Reaction->where($match)->delete();
        return $this->customResponse->is200Response($res, $Reaction);
    }
}
