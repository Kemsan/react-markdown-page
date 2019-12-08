// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'

// -- TYPING
interface InlineCodeProps {
  content: ComponentData[]
}

// -- COMPONENT
const InlineCode: React.FunctionComponent<InlineCodeProps> = ({ content, ...props }: InlineCodeProps) => (
  <Code {...props}><Part components={content} /></Code>
)

// -- UI
const Code = styled.code`
  display: inline-block;
  
  font-family: monospace;

  background: ${props => props.theme.color('white100')};
`

export default InlineCode
