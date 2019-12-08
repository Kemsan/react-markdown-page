// -- CORE
import React from 'react'
import { useSelector } from 'react-redux'
// -- SELECTORS
import selectPage from 'selectors/selectPage'
// -- COMPONENTS
import Part from './Part'

// -- TYPING
interface PartWithDataProps {
  page: string
}

// -- COMPONENT
const PartWithData: React.FunctionComponent<PartWithDataProps> = ({ page }: PartWithDataProps) => {
  const { components } = useSelector(selectPage(page))

  return (<Part components={components} />)
}

export default PartWithData
