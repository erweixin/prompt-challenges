import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 支持的语言列表
export const locales = ['en', 'zh']

// 获取请求路径的语言，如果没有则为默认语言
function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const defaultLocale = 'en'
  
  // 检查当前路径是否已经包含语言前缀
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale
    }
  }
  
  // 如果没有语言前缀，则根据 Accept-Language 头部决定
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const langPrefix = lang.substring(0, 2)
        return locales.includes(langPrefix)
      })
      
    if (preferredLocale) {
      const langPrefix = preferredLocale.substring(0, 2)
      if (locales.includes(langPrefix)) {
        return langPrefix
      }
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 排除特定路径，如 robots.txt, sitemap.xml, api 路由等
  if (
    pathname === '/robots.txt' || 
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // 检查当前路径是否已经包含语言前缀
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return NextResponse.next()
    }
  }
  
  // 获取语言并重定向
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // 排除不需要国际化的路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 