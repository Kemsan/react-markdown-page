// -- CORE
import React from 'react'
import styled from 'styled-components'

// -- TYPING
interface TextProps {
  content: string
}

// -- COMPONENT
const Text: React.FunctionComponent<TextProps> = ({ content, ...props }: TextProps) => (
  <Span {...props}>{content}</Span>
)

// -- UI
const Span = styled.span``

export default Text
