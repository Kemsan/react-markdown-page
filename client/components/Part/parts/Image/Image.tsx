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
  alt?: string
}

// -- COMPONENT
const Image: React.FunctionComponent<LinkProps> = ({ title, alt, target, ...props }: LinkProps) => (
  <Img src={sanitizeUrl(target)} alt={alt} title={title} {...props} />
)

// -- UI
const Img = styled.img``

export default Image
