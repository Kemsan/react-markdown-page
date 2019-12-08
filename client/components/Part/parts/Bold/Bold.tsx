// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'

// -- TYPING
interface BoldProps {
  content: ComponentData[]
}

// -- COMPONENT
const Bold: React.FunctionComponent<BoldProps> = ({ content, ...props }: BoldProps) => (
  <Strong {...props}><Part components={content} /></Strong>
)

// -- UI
const Strong = styled.strong`
  font-weight: bold;
`

export default Bold
