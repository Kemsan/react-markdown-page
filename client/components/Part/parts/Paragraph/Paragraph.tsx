// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'

// -- TYPING
interface TextProps {
  content: ComponentData[]
}

// -- COMPONENT
const Paragraph: React.FunctionComponent<TextProps> = ({ content, ...props }: TextProps) => (
  <P {...props}><Part components={content} /></P>
)

// -- UI
const P = styled.p``

export default Paragraph
