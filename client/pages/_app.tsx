// -- CORE
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
// -- STORE
import initializeStore from 'store'
// -- COMPONENTS
import Layout from 'components/Layout'
import MainHead from 'components/MainHead'
// -- DATA
import theme from 'components/Theme'
// -- TYPING
import { AppContext, AppProps } from 'next/dist/pages/_app'
import { fetchOptions } from 'reducers/page'

// -- TYPING
interface CustomAppProps extends AppProps {
  stores: object
}

// -- GLOBAL STORE
let globalStore

// -- COMPONENT
const App: React.FunctionComponent<CustomAppProps> = ({ Component, stores }: CustomAppProps) => {
  const store = globalStore || initializeStore(stores)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainHead />
        <Layout>
          <Component />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

// -- STATIC VALUES
// @ts-ignore
App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // Get request
  const { req } = ctx

  // Initialize store
  let store = globalStore

  if (req) {
    store = initializeStore(globalStore)
  } else if (!globalStore) {
    store = globalStore = initializeStore({})
  }
  // Data for component
  let data

  // Store
  // @ts-ignore
  ctx.store = store

  // Fetch settings
  fetchOptions()(store.dispatch)

  // Get data from Component initial props
  if (typeof Component.getInitialProps === 'function') {
    if (req) {
      data = await Component.getInitialProps(ctx) || {}
    } else {
      Component.getInitialProps(ctx)
    }
  }

  return {
    ...data,
    stores: store.getState()
  }
}

export default App
