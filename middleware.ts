import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import authConfig from './auth.config'
import { DEFAULT_LOGIN_REDIRECT, authApiPrefix, authRoutes, protectedRoutes, publicRoutes, twoFactorRoutes } from './constant'
import { callbacks } from './auth'

const { auth } = NextAuth({
  ...authConfig,
  callbacks: {
    session: callbacks?.session //* this is a workaround for getting updated session in middleware
  }
})

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const session = req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(authApiPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isTwoFactorRoute = twoFactorRoutes.includes(nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isAuthenticated) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return NextResponse.next()
  }

  if (!isAuthenticated && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  if (isTwoFactorRoute) {
    if (session && session.user && session.user.isTwoFactorVerified) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return NextResponse.next()
  }

  if (isPublicRoutes && nextUrl.pathname === '/') {
    //TODO: create a visitor for analytics in dashboard
  }

  return NextResponse.next()
})

export const config = {
  //* The following matcher runs middleware on all routes
  //* except static assets.
  //* This matcher is from clerk
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  unstable_allowDynamic: ['*lodash.js', '*.{js,mjs}']
}
