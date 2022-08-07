<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthorizeAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->id()) {

            if (auth()->user()->type == "admin") {
                return $next($request);
            }
            return response()->json([
                "message" => "Unautherized action"
            ], 403);

        }
        return response()->json([
            "message" => "Your are unauthenticated"
        ], 401);
    }
}
