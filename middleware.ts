
import { NextRequest, NextResponse } from 'next/server';
import { adminApp } from "./firebase.admin.config";

export default async function middleware(req: NextRequest) {
    let lies = "lies"
    let truths = "truths"
    if (lies===truths) {
        return NextResponse.rewrite(new URL('/denied', req.url))
      }
  }

  export const config = {
    matcher: ['/createSong'],
  }