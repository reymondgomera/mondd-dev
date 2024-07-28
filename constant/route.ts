/**
 * An array of routes that are accessible to public.
 * These routes does not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/examples', '/email-verification']

/**
 * An array of routes that are used for authentication.
 * These routes does not require authentication.
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/signup', '/forgot-password', '/new-password', '/auth-error']

/**
 * An array of routes that are used for authentication specialy for two factor authentication.
 * These routes requres authentication.
 * @type {string[]}
 */

export const twoFactorRoutes = ['/two-factor']

/**
 * An array of routes that are accessible to authenticated users.
 * These routes requires authentication.
 * @type {string[]}
 */
export const protectedRoutes = ['/dashboard']

/**
 * The prefix for all API routes that is used for authentication.
 * Routes that starts with this prefix are used for authentication.
 * @type {string}
 */
export const authApiPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

/**
 * An array of routes that will be force to light mode.
 */
export const lightModeRoutes = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/new-password',
  '/email-verification',
  '/two-factor',
  '/auth-error'
]
