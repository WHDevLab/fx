export const API_ROOT = 'http://api.breaker.club'

export const CookieDomain = (process.env.NODE_ENV === 'production')
  ? 'fx.breaker.club'
  : ''