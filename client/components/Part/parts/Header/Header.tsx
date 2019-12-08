// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'

// -- TYPING
interface HeaderProps {
  level: number
  content: ComponentData[]
}

// -- DATA

// -- COMPONENT
const Header: React.FunctionComponent<HeaderProps> = ({ level, content, ...props }: HeaderProps) => {
  // Get header component
  const Component = list[Number(level)] || list[1]

  return (
    <Component {...props}><Part components={content} /></Component>
  )
}

// -- UI
const H1 = styled.h1``
const H2 = styled.h2``
const H3 = styled.h3``
const H4 = styled.h4``
const H5 = styled.h5``

// List of headers
const list = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5
}

export default Header
