import { ApolloProvider } from '@apollo/client'
import { I18nProvider } from '@fixitshopcontrol/i18n'
import { is } from '@fixitshopcontrol/utils'
import Script from 'next/script'
import React, { FC } from 'react'

import GlobalStyle from '~/components/GlobalStyles/GlobalStyles'
import Config from '~/config'

const App: FC<any> = ({
  Component,
  pageProps,
  connectedUser,
  currentPath,
  locale = Config.i18n.defaultLocale
}) => {
  return (
    <>
      <GlobalStyle />
      <I18nProvider locale={locale}>
        <Component connectedUser={connectedUser} {...pageProps} />
      </I18nProvider>
    </>
  )
}

export default App
