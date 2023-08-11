import is from './is'

const cookies = {
  get(cookie: string, cookiesStr = '') {
    if (!cookiesStr && is.Browser()) {
      cookiesStr = document.cookie
    }

    const cookiesObj = cookiesStr.split('; ').reduce((prev: any, current: string) => {
      const [name, ...value] = current.split('=')
      prev[name] = value.join('=')
      return prev
    }, {})

    if (is.JSON(cookiesObj[cookie])) {
      return JSON.parse(cookiesObj[cookie])
    }

    return cookiesObj[cookie] ?? null
  },
  set(name: string, value: string, days?: number) {
    let expires = ''

    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`
  },
  getUserData(cookie = '') {
    let site = ''

    if (is.Browser()) {
      const { pageProps } = (window as any).__NEXT_DATA__.props
      site = pageProps.site
      cookie = document.cookie
    }

    const atCookie = `at-${site}`

    const at = cookie.includes(atCookie) && this.get(atCookie, cookie)
    const user = cookie.includes('user') && this.get('user', cookie)
    const theme = cookie.includes('theme') && this.get('theme', cookie)
    const userLanguage = cookie.includes('userLanguage') && this.get('userLanguage', cookie)

    const userData = {
      at,
      user,
      theme,
      userLanguage,
      isAdmin: user?.role === 'god' || user?.role === 'admin',
      isLogged: !!at && !!user
    }

    return userData
  }
}

export default cookies