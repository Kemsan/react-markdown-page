// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const Paragraph: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <P {...props}><Part components={content} /></P>
)

// -- UI
const P = styled.p``

export default Paragraph
