// -- CORE
import React, { ReactNode } from 'react'
import styled from 'styled-components'

// -- TYPING
interface LayoutProps {
  children: ReactNode
}

// -- COMPONENT
const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => (
  <Container>{children}</Container>
)

// -- UI
const Container = styled.main`
  width: ${props => props.theme.sizes.extraLarge}px;

  margin: 0 auto;
  padding: 20px 30px;

  box-sizing: border-box;
  box-shadow: ${props => props.theme.shadow(2)};

  ${props => props.theme.mediaMax.extraLarge`
    width: calc(100% - 40px);

    margin: 0 20px;
  `}
`

export default Layout
