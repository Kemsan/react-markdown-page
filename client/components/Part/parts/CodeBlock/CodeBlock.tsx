// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- COMPONENT
const Code: React.FunctionComponent<SinglePart> = ({ content, ...props }: SinglePart) => (
  <BlockCode {...props}><Part components={content} /></BlockCode>
)

// -- UI
const BlockCode = styled.pre`
  display: block;
  padding: .5rem 9.5px 9.5px;
  
  border: 1px solid ${props => props.theme.color('white300')};
  
  font-size: 1rem;
  line-height: 2rem;

  background: linear-gradient(
    to bottom, 
    ${props => props.theme.color('white')} 0,
    ${props => props.theme.color('white')} .75rem,
    ${props => props.theme.color('white200')} .75rem,
    ${props => props.theme.color('white200')} 2.75rem,
    ${props => props.theme.color('white')} 2.75rem,
    ${props => props.theme.color('white')} 4rem
  );
  background-size: 100% 4rem;
`

export default Code
