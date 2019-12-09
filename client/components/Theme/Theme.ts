// -- CORE
import { css, CSSObject, SimpleInterpolation } from 'styled-components'
// -- HELPERS
import { rgba } from 'helpers/color'

// -- TYPING
export type CSSStyles = CSSObject | TemplateStringsArray

export interface BasicData<T = string> {
  [k: string]: T
}

export const sizes: BasicData<number> = {
  extraLarge: 1140,
  large: 992,
  medium: 640,
  small: 400,
  ultraSmall: 360,
  phone: 0
}

export interface Theme {
  colors: BasicData<string>
  media: BasicData<Object>
  mediaMax: BasicData<Object>
  sizes: BasicData<number>

  color: (name: string, opacity: number) => string
  shadow: (level: number) => string
  fontFamily: (name: string) => string
  fontSize: (name: string) => string
}

// -- DATA
const fontFamily: BasicData<string> = {
  black: 'latobold',
  bold: 'latobold',
  regular: 'latoregular'
}

const fontSize: BasicData<string> = {
  h1XL: '3.5rem',
  h1: '2.5rem',
  h2: '1.75rem',
  h3: '1.375rem',
  h4: '1.125rem',
  xl: '1.25rem',
  large: '1rem',
  regular: '0.875rem',
  small: '0.75rem'
}

const shadows: BasicData<string> = {
  1: '0 1px 2px 0 rgba(0, 0, 0, .1)',
  2: '0 4px 8px 0 rgba(0, 0, 0, .1)',
  3: '0 6px 12px 0 rgba(0, 0, 0, .1)',
  4: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',
  5: '0 1px 4px 0 rgba (37, 143, 209, 0.2)',
  6: '0 1px 0 1px rgba(255, 255, 255, 0.09)',
  7: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  8: '0 0 8px 0 rgba(0, 0, 0, 0.1)'
}

/**
 * Creates list of media queries based on given type propery
 *
 * @param type Type of media to create - min or max
 */
const mediaFactory = (type: 'min' | 'max') => {
  const size = type === 'max' ? 1 : 0

  return Object.keys(sizes).reduce((acc: BasicData<Object>, label: string) => {
    acc[label] = (first: CSSStyles, ...args: SimpleInterpolation[]) => css`
      @media (${type}-width: ${sizes[label] - size}px) {
        ${css(first, ...args)}
      }
    `

    return acc
  }, {})
}

// Create basic media queries
const media = mediaFactory('min')
const mediaMax = mediaFactory('max')

// Theme object
const theme: Theme = {
  colors: {
    primary: '#A172E7',
    secondary: '#984A7E',
    white: '#fff',
    white100: '#eee',
    white200: '#F4F6FA',
    white300: '#ccc',
    black: '#000',
    transparent: 'transparent'
  },
  media,
  mediaMax,
  sizes,

  color (name, opacity) {
    const color = this.colors[name] || this.colors.black

    if (opacity !== null && opacity !== undefined) {
      return rgba(color, opacity)
    }

    return color
  },

  shadow (level) {
    return shadows[level] || shadows[1]
  },

  fontFamily (name) {
    return `${fontFamily[name] || fontFamily.regular}, sans-serif`
  },

  fontSize (name) {
    return fontSize[name] || fontSize.regular
  }
}

export default theme
