// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const Bold: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <Strong {...props}><Part components={content} /></Strong>
)

// -- UI
const Strong = styled.strong`
  font-weight: bold;
`

export default Bold
