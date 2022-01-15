<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    public $timestamps = false;
    protected  $table = "Comment";

    protected $fillable =["id_cmt", "id_post", "id_user", "content"];

}