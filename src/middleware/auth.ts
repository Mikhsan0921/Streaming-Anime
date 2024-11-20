// authHandler.ts
import { NextRequest, NextResponse } from 'next/server'

export function checkAuthentication(request: NextRequest, response: NextResponse) {
    const isAuthenticated = request.cookies.get('authToken') !== undefined

    if (!isAuthenticated) {
        console.log('Not authenticated')
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    console.log('Authenticated')
    return response
}
