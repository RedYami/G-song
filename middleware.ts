
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    
    if (!req.cookies.get("firebase-auth")) {
        return NextResponse.rewrite(new URL('/denied', req.url))
      }
    return NextResponse.next()
  }

  export const config = {
    matcher: ['/createSong'],
  }