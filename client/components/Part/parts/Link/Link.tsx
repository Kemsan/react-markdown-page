// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part from 'components/Part/Part'
// -- HELPERS
import sanitizeUrl from 'helpers/santizeUrl'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- TYPING
interface LinkProps extends SinglePart {
  title?: string
  target: string
}

// -- COMPONENT
const Link: React.FunctionComponent<LinkProps> = ({ title, target, content, ...props }: LinkProps) => (
  <A href={sanitizeUrl(target)} title={title} {...props}><Part components={content} /></A>
)

// -- UI
const A = styled.a``

export default Link
