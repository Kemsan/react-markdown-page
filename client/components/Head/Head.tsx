// -- CORE
import React from 'react'
import NextHead from 'next/head'
// -- TYPING
import { PageStateOptions } from 'reducers/page'

// -- TYPING
interface HeadProps {
  options: PageStateOptions
}

// -- COMPONENT
const Head: React.FunctionComponent<HeadProps> = ({ options }: HeadProps) => (
  <NextHead>
    {options.title && (<title>{options.title}</title>)}
  </NextHead>
)

export default Head
