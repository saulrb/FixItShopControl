import { Locale } from '@fixitshopcontrol/i18n'
import { ValueOf } from '@fixitshopcontrol/utils'

export type Mode = 'production' | 'development'

export enum DeploymentType {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development'
}

export interface Configuration {
  siteTitle: string
  domainName: string
  theme?: {
    defaultTheme: 'light' | 'dark'
  }
  homeUrl?: string
  hostname?: string
  mode?: string
  api: {
    uri: string
  }
  i18n: {
    locales: Locale[]
    languages: string[]
    defaultLocale: Locale
  }
  redirections?: {
    localeRedirections: Record<string, Locale>
  }
}
