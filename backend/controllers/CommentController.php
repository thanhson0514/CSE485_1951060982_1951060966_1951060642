<?php

namespace app\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use app\controllers\CustomResponse;
use Slim\Http\UploadedFile;

use app\models\Post;
use app\models\Comment;
use app\models\Image;
use Exception;

class CommentController
{
    private $customResponse;
    private $directoryImages = __DIR__ . '/../public/images/';

    public function __construct()
    {
        $this->customResponse = new CustomResponse();
    }

    public function get(Request $req, Response $res, $args)
    {
        $id_post = (int)$args['id_post'];
        $id_user = $req->getAttribute('id_user');

        $Post = new Post();
        $Comment = new Comment();

        $count = $Post->where('id_post', '=', $id_post)->count();
        if (!$count) {
            return $this->customResponse->is404Response($res, 'The post is not found!');
        }

        $getComments = $Comment
            ->join('User', 'Comment.id_user', '=', 'User.id_user')
            ->where('Comment.id_post', '=', $id_post)
            ->select('Comment.*', 'username', 'avatar')
            ->orderBy('created_at', 'ASC')->get();

        $data = [];
        $Image = new Image();

        foreach ($getComments as $key => $value) {
            $data[$key] = $value;
            $images = $Image->where('id_cmt', '=', $getComments[$key]['id_cmt'])->select('imgUrl')->first();
            if ($images !== NULL) $data[$key]['imgUrl'] = $images['imgUrl'];
        }

        return $this->customResponse->is200Response($res, $data);
    }

    public function create(Request $req, Response $res, $args)
    {
        $body = $req->getParsedBody();
        $id_post = $args['id_post'];
        $id_user = $req->getAttribute('id_user');
        $Post = new Post();
        $Comment = new Comment();
        $Image = new Image();

        $count = $Post->where('id_post', '=', $id_post)->count();
        if (!$count) {
            return $this->customResponse->is404Response($res, 'The post is not found!');
        }

        $content = $body['content'];
        $filename = '';

        $uploadedFiles = $req->getUploadedFiles();
        if (isset($uploadedFiles['image'])) {
            $uploadedFile = $uploadedFiles['image'];

            if (!$uploadedFile || !count($uploadedFiles)) {
                $filename = '';
            } else {
                if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                    $filename = $this->moveUploadedFile($uploadedFile);
                }
            }
        }

        $Comment->id_post = $id_post;
        $Comment->id_user = $id_user;
        $Comment->content = $content;

        $Comment->save();

        $Image->create([
            'id_cmt' => $Comment->id,
            'imgUrl' => $filename
        ]);

        return $this->customResponse->is201Response($res, $Comment);
    }

    public function update(Request $req, Response $res, $args)
    {
        $id_post = $args['id_post'];
        $id_cmt = $args['id_cmt'];
        $id_user = $req->getAttribute('id_user');
        $body = $req->getParsedBody();
        $content = NULL;
        $image = NULL;

        if (isset($body['content']))
            $content = $body['content'];
        if (isset($body['image']))
            $image = $body['image'];

        $Comment = new Comment();
        $Image = new Image();

        $match = ['id_post' => $id_post, 'id_cmt' => $id_cmt, 'id_user' => $id_user];
        $queryCmt = $Comment->where($match)->first();
        $queryImg = $Image->where('id_cmt', '=', $id_cmt)->first();

        if (!$queryCmt) {
            return $this->customResponse->is404Response($res, 'Bình luận không tồn tại');
        }

        if (!$image) {
            $filename = '';
        } else {
            $filename = $this->moveUploadedFileBase64($image);
            if ($queryImg->imgUrl || strlen($queryImg->imgUrl))
                unlink($this->directoryImages . $queryImg->imgUrl);
        }

        $Comment->where($match)->update(['content' => $content]);
        $Image->where('id_cmt', '=', $id_cmt)->update(['imgUrl' => $filename]);

        return $this->customResponse->is200Response($res, $Comment);
    }

    public function delete(Request $req, Response $res, $args)
    {
        $id_post = (int)$args['id_post'];
        $id_user = $req->getAttribute('id_user');
        $id_cmt = (int)$args['id_cmt'];

        $Comment = new Comment();
        $Image = new Image();

        $match = ['id_post' => $id_post, 'id_cmt' => $id_cmt, 'id_user' => $id_user];

        $results = $Comment->where($match)->get();
        $decode = json_decode($results, true);

        if (!count($decode)) {
            return $this->customResponse->is401Response($res, 'Không thể xóa được bình luận này!');
        }

        $Image->where('id_cmt', '=', $id_cmt)->delete();
        $Comment->where($match)->delete();

        return $this->customResponse->is200Response($res, $Comment);
    }

    private function moveUploadedFileBase64($base64Image)
    {
        list($dataType, $imageData) = explode(';', $base64Image);
        $imageExtension = explode('/', $dataType)[1];
        list(, $encodedImageData) = explode(',', $imageData);

        $directory = $this->directoryImages;

        // decode base64-encoded image data
        $decodedImageData = base64_decode($encodedImageData);
        $date = date("H-i-s");
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('cmt-%s-%s.%0.8s', $basename, $date, $imageExtension);
        file_put_contents($directory . $filename,  $decodedImageData);

        return $filename;
    }

    private function moveUploadedFile(UploadedFile $uploadedFile)
    {
        $extension = pathinfo(
            $uploadedFile->getClientFilename(),
            PATHINFO_EXTENSION
        );

        $directory = $this->directoryImages;

        $date = date("H-i-s");
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('cmt-%s-%s.%0.8s', $basename, $date, $extension);
        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}
