// -- CORE
import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import styled from 'styled-components'
// -- HELPERS
import sanitizeUrl from 'helpers/santizeUrl'
import isUrl from 'helpers/isUrl'

// -- TYPING
interface LinkProps {
  href: string
  children: ReactNode
}

// -- COMPONENT
const Link: React.FunctionComponent<LinkProps> = ({ href, children, ...props }: LinkProps) => {
  let link = sanitizeUrl(href)
  let page = ''

  // Check if given link is path
  if (!isUrl(href)) {
    page = href.indexOf('/') === 0 ? href.substr(1).split('/')[0] : href
    link = `/landing?slug=${href}&page=${page}`

    return (
      <NextLink href={link} as={href} passHref>
        <MainLink {...props}>{children}</MainLink>
      </NextLink>
    )
  }

  return (
    <NextLink href={href} passHref>
      <MainLink {...props}>{children}</MainLink>
    </NextLink>
  )
}

// -- UI
const MainLink = styled.a``

export default Link
