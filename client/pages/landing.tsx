// -- CORE
import React from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
// -- PAGE DUCKS
import { fetchPage } from 'reducers/page'
import { Store } from 'redux'
// -- COMPONENTS
import Head from 'components/Head'
import PartWithData from 'components/Part/PartWithData'

// -- TYPING
interface HomeContext extends NextPageContext {
  store: Store
}

// -- COMPONENT
const Landing = () => {
  const { query } = useRouter()
  const { page } = query
  const pageName = String(page)

  return (
    <>
      <Head page={pageName} />
      <PartWithData page={pageName} />
    </>
  )
}

// -- STATIC VALUES
Landing.getInitialProps = async (ctx: HomeContext) => {
  // Get slug
  const page = String(ctx.query.page || 'home')

  // Fetch page
  await fetchPage(page)(ctx.store.dispatch)

  return {
    page
  }
}

export default Landing
