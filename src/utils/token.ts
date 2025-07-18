import Cookies from 'js-cookie'

export function getTokenFromSearchOrCookie(rawToken: string | null): string | undefined {
  const cleanedToken = rawToken?.replace(/^<|>$/g, '')
  if (cleanedToken) {
    Cookies.set('custParam', cleanedToken, { path: '/', sameSite: 'strict' })
    return cleanedToken
  }
  return Cookies.get('custParam')
}