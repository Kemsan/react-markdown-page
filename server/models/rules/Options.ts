// -- CORE
import Rule, { BaseRule, RuleData } from '../Rule'
import { Capture, SingleASTNode } from 'simple-markdown'
import matchAttributes, { MatchData } from '../helpers/matchAttributes'

// -- TYPING
interface OptionsClass extends BaseRule {}

// RegExpes and data
const RULE_REGEXP = /^ *(-{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/

// -- RULE
class Options extends Rule implements OptionsClass {
  // Name of part
  name: string = 'Options'

  // Specify the order in which this rule is to be run
  order: number = 2

  // Type
  type: string = 'options'

  /**
   * Creates new object of single part element. Uses "error" as base component
   *
   * @returns Base component object. With "error" as component
   */
  rule (): RuleData {
    return {
      type: this.type,
      component: 'data',
      attrs: {},
      items: []
    }
  }

  /**
   * Matches block of text using Options block regex
   *
   * @param source Source string
   * @returns RegExp result for matched text
   */
  match (source: string): Capture | null {
    const result = RULE_REGEXP.exec(source)

    if (result && result.index === 0) {
      return result
    }

    return null
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
  parse (capture: Capture): SingleASTNode {
    const content = capture && capture[3]
    const rule = this.rule()

    if (!content) {
      return rule
    }

    const blockParts = content.split('\n')
    const data: MatchData = matchAttributes(blockParts)

    // Attach attrs for part
    rule.attrs = data.attrs

    return rule
  }
}

export default Options
