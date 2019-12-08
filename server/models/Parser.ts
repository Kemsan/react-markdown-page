// -- CORE
import markdown from 'simple-markdown'
import * as path from 'path'
import chokidar from 'chokidar'
// -- MODELS
import Cache from './Cache'
// -- HELPERS
import { fileRead, dirRead } from './helpers/file'
// -- DATA
import rulesList from './rules'

// -- CLASS
class Parser {
  /**
   * Templates directory, where search for parsed files
   */
  templatesDirectory: string = path.resolve(__dirname, '../../templates')

  /**
   * Markdown parser
   */
  parser: markdown.Parser = null
  cache: Cache = null

  constructor () {
    const rules = {
      ...markdown.defaultRules,
      ...rulesList
    }

    this.parser = markdown.parserFor(rules)
    this.cache = new Cache()
  }

  /**
   * Parses whole templates directory. Should be run before any server starts
   *
   * @returns Was action sucessfull.
   */
  async parseDirectory () {
    const files = await dirRead(this.templatesDirectory, true, true)
    const promises = []

    files.forEach(file => {
      promises.push(
        this.parseFile(file as string, true)
      )
    })

    return Promise.all(promises)
  }

  /**
   * Parses file content into object. If store parameter is provided, store given object into cache directory
   *
   * @param filePath Path to file
   * @returns Promise with parsed markdown for file
   */
  parseFile (filePath: string, store: boolean = true): Promise<object> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const content = await fileRead(filePath)
          const parsed = this.parser(content)

          if (store) {
            try {
              await this.cache.add(filePath, parsed)

              resolve(parsed)
            } catch (e) {
              reject(e)
            }

            return
          }

          resolve(parsed)
        } catch (e) {
          reject(e)
        }
      })()
    })
  }

  /**
   * Removes file from cache
   *
   * @param filePath Path to file
   * @returns Was file removed
   */
  removeFile (filePath: string): boolean {
    try {
      this.cache.delete(filePath)

      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Runs watcher over files in templates directory. Will rebuild any file if something is added or changed
   */
  async watch () {
    // Watch directory
    chokidar.watch(this.templatesDirectory).on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        this.parseFile(path)
        return
      }

      if (event === 'unlink') {
        this.removeFile(path)
      }
    })
  }
}

export default Parser
