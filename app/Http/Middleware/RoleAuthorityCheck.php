<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleAuthorityCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // for routes allowing multiple role s, send in this format: '1,2,3,4' explode to array, 
        // check if $request->user()->role is in array, 
        // use:  in_array("23", $people, TRUE)

        // here we need currently logged in user role, and also the role the current route belongs to
        if ( $request->user()->role !== $role ) {
            return response('This method is not allowed', 401);
        }

        return $next($request);
    }
}
