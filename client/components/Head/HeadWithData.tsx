// -- CORE
import React from 'react'
import { useSelector } from 'react-redux'
// -- COMPONENTS
import Head from './Head'
// -- SELECTORS
import selectPage from 'selectors/selectPage'

// -- TYPING
interface HeaderWithDataProps {
  page: string
}

// -- COMPONENT
const HeadWithdata: React.FunctionComponent<HeaderWithDataProps> = ({ page }: HeaderWithDataProps) => {
  const pageData = useSelector(selectPage(page))

  return (
    <Head options={pageData.options || {}} />
  )
}

export default HeadWithdata
