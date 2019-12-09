// -- TYPING
export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface ColorRGBA extends ColorRGB {
  a: number
}

/**
 * Converts hexdecimal color into rgb object
 *
 * @param hex Hexdec string
 * @returns RGB representation of converted hex color
 *
 * @example
 *
 * hex2rgb('#ccc')
 * // => { a: 204, b: 204, c: 204 }
 */
export const hex2rgb = (hex: string): ColorRGB => {
  let color = hex

  if (color[0] === '#') {
    color = hex.substr(1)
  }

  if (color.length === 6) {
    return {
      r: parseInt(color.substr(0, 2), 16),
      g: parseInt(color.substr(2, 2), 16),
      b: parseInt(color.substr(4, 2), 16)
    }
  }

  return {
    r: parseInt(color[0] + color[0], 16),
    g: parseInt(color[1] + color[1], 16),
    b: parseInt(color[2] + color[2], 16)
  }
}

/**
 * Converts hexdecimal color and opacity value into rgba object
 *
 * @param hex Hexdec string
 * @param opacity Opacity value
 * @returns RGBA representation of converted hex color with mixed opacity value
 *
 * @example
 *
 * hex2rgba('#ccc', 0.2)
 * // => { a: 204, b: 204, c: 204, a: 0.2 }
 */
export const hex2rgba = (hex: string, opacity: number): ColorRGBA => {
  const color = hex2rgb(hex)

  return {
    ...color,
    a: opacity
  }
}

/**
 * Converts hexdecimal color to rgb css string
 *
 * @param hex Hexdec string
 * @returns RGB string color
 *
 * @example
 *
 * rgb('#ccc')
 * // => rgb(204, 204, 204)
 */
export const rgb = (hex: string): string => {
  const { r, g, b } = hex2rgb(hex)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Converts hexdecimal color to rgba css string
 *
 * @param hex Hexdec string
 * @param opacity RGBA string color
 *
 * @example
 *
 * conosle.log(rgba('#ccc', 0.2))
 * // => rgba(204, 204, 204, 0.2)
 */
export const rgba = (hex: string, opacity: number): string => {
  const {
    r, g, b, a
  } = hex2rgba(hex, opacity)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export default {
  hex2rgb, hex2rgba, rgb, rgba
}
