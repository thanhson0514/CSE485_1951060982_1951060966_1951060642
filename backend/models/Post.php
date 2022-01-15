<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $timestamps = false;
    protected  $table = "Post";

    protected $fillable =["id_post","id_user","id_cmt", "id_reaction", "content"];
}