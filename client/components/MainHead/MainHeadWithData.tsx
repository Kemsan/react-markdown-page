// -- CORE
import React from 'react'
import { useSelector } from 'react-redux'
// -- COMPONENTS
import Head from './MainHead'
// -- SELECTORS
import selectConfig from 'selectors/selectConfig'

// -- COMPONENT
const HeadWithdata: React.FunctionComponent<{}> = () => {
  const options = useSelector(selectConfig)

  return (
    <Head options={options} />
  )
}

export default HeadWithdata
