<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyOwnership
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

            if (auth()->id() == $request->route("user_id")) return $next($request);
            else {
                return response()->json([
                    "message" => "Unautherized user"
                ], 403);
            }
        }
        return response()->json([
            "message" => "Unauthenticated user"
        ], 401);
    }
}
