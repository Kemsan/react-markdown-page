// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Link from 'components/Link'
import Part from 'components/Part/Part'
// -- HELPERS
import sanitizeUrl from 'helpers/santizeUrl'
// -- TYPES
import { SingleComponent } from '../../componentTypes'

// -- TYPE
interface ButtonProps extends SingleComponent {
  attrs: {
    href: string
  }
}

// -- COMPONENT
const Button: React.FunctionComponent<ButtonProps> = ({ attrs, items }: ButtonProps) => (
  <MainLink href={sanitizeUrl(attrs.href)}>
    <Part components={items} />
  </MainLink>
)

// -- UI
const MainLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  width: fit-content;

  border: 2px solid ${props => props.theme.color('black', 0.25)};
  box-sizing: border-box;

  text-decoration: none;
  text-align: center;
  text-transform: uppercase;

  font-weight: bold;

  transition: all .5s;

  color: ${props => props.theme.color('black')};

  &:hover {
    border-color: ${props => props.theme.color('black', 0)};
    background: ${props => props.theme.color('black', 0)};
  }
`

export default Button
