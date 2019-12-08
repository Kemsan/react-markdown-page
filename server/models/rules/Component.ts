// -- CORE
import { State, Capture, Parser, SingleASTNode, ASTNode } from 'simple-markdown'
import Rule, { BaseRule } from '../Rule'
// -- HELPERS
import matchAttributes, { MatchData, MatchAttributes } from '../helpers/matchAttributes'

// -- TYPING
export interface ComponentRule extends SingleASTNode {
  component: 'error' | string
  attrs: MatchAttributes
}

export interface ComponentClass extends BaseRule {
  name: string
  type: string

  rule: () => ComponentRule
}

// RegExpes and data
const PART = '(?:- !)'
const PART_REGEXP = new RegExp(
  `^( *)(${PART})` +
  '[\\s\\S]+?(?:\n{2,}(?! )' +
  `(?!\\1${PART} )\\n*` +
  '|\\s*\n*$)'
)
// Part single item
const PART_ITEM_PREFIX = `( *)(${PART})`
const PART_ITEM_PREFIX_REGEXP = new RegExp(`^${PART_ITEM_PREFIX}`)
const PART_ITEM_REGEXP = new RegExp(
  `${PART_ITEM_PREFIX}[^\\n]*(?:\\n` + `(?!\\1${PART})[^\\n]*)*(\n|$)`,
  'gm'
)
const PART_END_REGEXP = /\n{2,}$/
// Block
const ITEM_TITLE_REGEXP = /^(?:- *)!(\w+)/

/**
 * Component part
 */
class Component extends Rule implements ComponentClass {
  // Name of part
  name: string = 'Component'

  // Specify the order in which this rule is to be run
  order: number = 1

  // Type
  type: string = 'component'

  /**
   * Creates new object of single part element. Uses "error" as base component
   *
   * @returns Base component object. With "error" as component
   */
  rule (): ComponentRule {
    return {
      type: this.type,
      component: 'error',
      attrs: {},
      items: []
    }
  }

  /**
   * Matches block of text using Component block regex
   *
   * @param source Source string
   * @returns RegExp result for matched text
   */
  match (source: string): Capture | null {
    return PART_REGEXP.exec(source)
  }

  /**
   * Parses matched data. Converting text into object - each component block
   * nested inside will be also converted to object
   *
   * @param capture RegExp object of captured content
   * @param parse Parser method, for deeper parsing
   * @param state Current state of parser
   * @returns Part object
   */
  parse (capture: Capture, parse: Parser, state: State): ASTNode {
    const captured = capture && capture[0]
    const part = this.rule()

    if (!captured) {
      return part
    }

    // Match items under currenti identation
    const items = captured.replace(PART_END_REGEXP, '\n').match(PART_ITEM_REGEXP)

    // Map items
    const result = items.map(item => {
      // Capture prefix on single part
      const prefixCapture = PART_ITEM_PREFIX_REGEXP.exec(item)

      // Get indentation size
      const space = (prefixCapture && prefixCapture[0].length) || 0

      // Missing space
      if (!space) {
        return part
      }

      // Cleanup source from indentation
      const content = item.replace(new RegExp(`^ {1,${space}}`, 'gm'), '')

      // Split content into parts using enter as delimiter
      const { text, ...data } = this.matchBlock(content)

      // Parse nested data
      const items = text !== '' ? parse(text, state) : []

      return {
        ...data,
        items
      }
    })

    return result
  }

  /**
   * Parses block string into block object containing compnoent name, attributes and text
   *
   * @param content Content of single block
   * @returns Component object
   */
  matchBlock (content: string): ComponentRule {
    // Create base part
    const result: ComponentRule = this.rule()

    // Split content into parts using enter as delimiter
    const blockParts = content.split('\n')
    let first: string
    let title: RegExpExecArray
    let data: MatchData

    // Match only existing blocks
    if (blockParts.length > 0) {
      first = blockParts.shift()
      title = ITEM_TITLE_REGEXP.exec(first)

      if (title) {
        result.component = title[1]
      }

      // Get text and attributes for block
      data = matchAttributes(blockParts)

      if (data) {
        result.attrs = data.attrs
        result.text = data.text
      }
    }

    return result
  }
}

export default Component
