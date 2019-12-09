// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const InlineCode: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <Quote {...props}><Part components={content} /></Quote>
)

// -- UI
const Quote = styled.blockquote`
  margin-left: 0;

  p {
    padding: .5rem 1rem 1rem;

    font-style: italic;
    border-left: 3px solid ${props => props.theme.color('primary')};
  }
`

export default InlineCode
