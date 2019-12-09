// -- CORE
import React from 'react'
import NextHead from 'next/head'
// -- TYPING
import { PageStateOptions } from 'reducers/page'
// -- HELPERS
import normalizeCss from 'components/Theme/normalizeCss'

// -- TYPING
interface HeadProps {
  options: PageStateOptions
}

// -- COMPONENT
const Head: React.FunctionComponent<HeadProps> = ({ options }: HeadProps) => (
  <NextHead>
    <style type='text/css' dangerouslySetInnerHTML={{ __html: normalizeCss }} />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans&display=swap' rel='stylesheet' />
    <title>{options.title}</title>
  </NextHead>
)

export default Head
