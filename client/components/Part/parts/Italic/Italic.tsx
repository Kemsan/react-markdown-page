// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- TYPI

// -- COMPONENT
const Italic: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <Em {...props}><Part components={content} /></Em>
)

// -- UI
const Em = styled.em`
  font-style: italic;
`

export default Italic
