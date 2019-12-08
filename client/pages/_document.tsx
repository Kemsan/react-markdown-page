// -- CORE
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
// -- TYPING
import { DocumentContext } from 'next/dist/next-server/lib/utils'

class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    // Create stylesheet
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // Enhace renderPage from context api
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: Object) => sheet.collectStyles(<App {...props} />)
        })

      // Get initial props from app
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        // Attach styles using StyledComponents and Next Head
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      // Seal sheet
      sheet.seal()
    }
  }

  render () {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
