// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const Text: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <Span {...props} dangerouslySetInnerHTML={{ __html: String(content).replace(/\n/, '<br />') }} />
)

// -- UI
const Span = styled.span``

export default Text
