// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'

// -- TYPING
interface ItalicProps {
  content: ComponentData[]
}

// -- COMPONENT
const Italic: React.FunctionComponent<ItalicProps> = ({ content, ...props }: ItalicProps) => (
  <Em {...props}><Part components={content} /></Em>
)

// -- UI
const Em = styled.em`
  font-style: italic;
`

export default Italic
