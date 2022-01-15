<?php

namespace app\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use app\controllers\CustomResponse;
use Slim\Http\UploadedFile;
use app\models\Post;
use app\models\Image;
use app\models\Comment;
use Exception;

class PostController
{
    private $customResponse;
    private $directoryImages = __DIR__ . '/../public/images/';
    private $directoryVideos = __DIR__ . '/../public/videos/';

    public function __construct()
    {
        $this->customResponse = new CustomResponse();
    }

    public function get(Request $req, Response $res)
    {
        $Post = new Post();
        $Image = new Image();

        $getPosts = $Post
            ->join('User', 'Post.id_user', '=', 'User.id_user')
            ->select('Post.*', 'username', 'avatar', 'Post.id_user')
            ->orderBy('created_at', 'DESC')
            ->get();

        $data = [];
        foreach ($getPosts as $key => $value) {
            $data[$key] = $value;
            $getImages = $Image->where('id_post', '=', $value->id_post)->select('imgUrl')->get();
            $images = array();

            foreach ($getImages as $image => $url) {
                array_push($images, $url->imgUrl);
            }

            $data[$key]['imgUrl'] = $images;
        }

        return $this->customResponse->is200Response($res, $data);
    }

    public function getOne(Request $req, Response $res, $args)
    {
    }

    public function create(Request $req, Response $res)
    {
        try {
            $body = $req->getParsedBody();
            $id_user = $req->getAttribute('id_user');
            $Post = new Post();
            $Image = new Image();
            $content = $body['content'];
            $imgUrl = [];

            $uploadedFiles = $req->getUploadedFiles();
            if (isset($uploadedFiles['imgUrl'])) {
                $uploadedMulFile = $uploadedFiles['imgUrl'];
                $imgUrl = array();

                foreach ($uploadedMulFile as $file) {
                    if ($file->getError() === UPLOAD_ERR_OK) {
                        $filename = $this->moveUploadedFile($file);
                        array_push($imgUrl, $filename);
                    }
                }
            }

            $Post->id_user = $id_user;
            $Post->content = $content;

            $Post->save();

            foreach ($imgUrl as $images => $url) {
                $Image->create([
                    "id_post" => $Post->id,
                    "imgUrl" => $url
                ]);
            }

            return $this->customResponse->is200Response($res, $Post);
        } catch (Exception $e) {
            return $this->customResponse->is500Response($res, $e->getMessage());
        }
    }

    public function update(Request $req, Response $res, $args)
    {
        $id_post = $args['id'];
        $body = $req->getParsedBody();
        $content = $body['content'];
        $Post = new Post();

        $images = $body['images'];
        $Image = new Image();

        $getImages = $Image->where('id_post', '=', $id_post)->select('imgUrl')->get();
        $getUrlImages = [];

        foreach ($getImages as $image) {
            array_push($getUrlImages, $image->imgUrl);
        }

        $images_diff_from_DB = array_diff($getUrlImages, $images);
        if (count($images_diff_from_DB)) {
            foreach ($images_diff_from_DB as $pathname) {
                unlink($this->directoryImages . $pathname);
            }
            $Image->where('id_post', '=', $id_post)->delete();
        }

        $images_diff_from_client = array_diff($images, $getUrlImages);
        foreach ($images_diff_from_client as $url_base64) {
            $filename = $this->moveUploadedFileBase64($url_base64);
            $Image->create([
                "id_post" => $id_post,
                "imgUrl" => $filename
            ]);
        }

        $Post->where('id_post', '=', $id_post)->update(['content' => $content]);

        return $this->customResponse->is200Response($res, $Post);
    }

    public function delete(Request $req, Response $res, $args)
    {
        $id_post = $args['id'];

        $Post = new Post();
        $Image = new Image();
        $Comment = new Comment();

        $data = $Post->where('id_post', '=', $id_post);

        if (!$data) {
            return $this->customResponse->is404Response($res, "Can't found is the post!");
        }

        $join = $Post
            ->join('Images', 'Images.id_post', '=', 'Post.id_post')
            ->where('Post.id_post', '=', $id_post)
            ->select('imgUrl')->get();

        foreach (json_decode($join, true) as $image) {
            unlink($this->directoryImages . $image['imgUrl']);
        }
        $comments = $Comment->where('id_post', '=', $id_post)->get();

        foreach ($comments as $comment) {
            $Image->where('id_cmt', '=', $comment['id_cmt'])->delete();
        }

        $Image->where('id_post', $id_post)->delete();
        $Comment->where('id_post', $id_post)->delete();
        $Post->where('id_post', $id_post)->delete();

        return $this->customResponse->is200Response($res, $Post);
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
        $filename = sprintf('post-%s-%s.%0.8s', $basename, $date, $extension);
        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
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
        $filename = sprintf('post-%s-%s.%0.8s', $basename, $date, $imageExtension);
        file_put_contents($directory . $filename,  $decodedImageData);

        return $filename;
    }
}
