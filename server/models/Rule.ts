import { MatchFunction, ParseFunction } from 'simple-markdown'

// -- INTERFACE
export type OptionValue = string | number | boolean | object
export type RuleValue = OptionValue | any[]
export type RuleValuesList = {
  [k: string]: RuleValue
}

export interface RuleData {
  type: string
  [k: string]: any
}

export interface BaseRule {
  name: string
  rule: () => RuleData

  match: MatchFunction
  parse: ParseFunction
}

export interface RuleClass {}

class Rule implements RuleClass {
  name: string = 'baserule'

  /**
   * Rule object
   */
  rule () {
    return {
      type: 'base'
    }
  }
}

export default Rule
