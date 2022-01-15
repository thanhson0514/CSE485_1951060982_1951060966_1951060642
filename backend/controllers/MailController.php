<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class MailController
{
    public function verify(Request $req, Response $res)
    {
        $body = $req->getParsedBody();
        $code = $body['code'];
    }
}
