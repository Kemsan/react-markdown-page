// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const InlineCode: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <Code {...props}><Part components={content} /></Code>
)

// -- UI
const Code = styled.code`
  display: inline-block;
  
  font-family: monospace;

  background: ${props => props.theme.color('white100')};
`

export default InlineCode
