<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class BlogsController extends Controller
{
    public function getBlogs($doctor_id) {

        $blogs = Blog::where("doctor_id", $doctor_id)->get();

        return response()->json([
            "blogs" => $blogs
        ], 200);
    }
}
