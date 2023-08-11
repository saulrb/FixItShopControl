import { cx, getUrlWithoutLocale } from '@fixitshopcontrol/utils'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import Config from '~/config'
import dashboardCssVariables from '~/theme/dashboardCssVariables'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => {
            const page = getUrlWithoutLocale(props.router.asPath)
            const pageClassname = page.includes('dashboard') ? 'dashboard' : ''
            const themeClassname = `theme--${
              pageClassname !== 'dashboard' ? Config.theme?.defaultTheme : 'light'
            }`
            console.log('themeClassname', themeClassname)
            return sheet.collectStyles(
              <body className={cx(themeClassname, pageClassname)}>
                <App {...props} title={Config.siteTitle} />
              </body>
            )
          }
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/images/favicon.png" />

          <style>{dashboardCssVariables}</style>
        </Head>

        <Main />
        <NextScript />
      </Html>
    )
  }
}
