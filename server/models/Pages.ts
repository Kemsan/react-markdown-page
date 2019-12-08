// -- CORE
import * as path from 'path'
// -- MODELS
import Parser from './Parser'
// -- HELPERS
import { dirReadSync } from './helpers/file'
import { SingleASTNode } from 'simple-markdown'

// -- TYPES
export interface SinglePage {
  options?: object
  components?: object[]
}

export interface PagesInterface {
  templatesDirectory: string
  parser: Parser | null

  path: (name: string, anyPath?: boolean) => string
  list: () => string[]
}

export interface PagesOptions {
  templatesDirectory?: string
}

class Pages implements PagesInterface {
  /**
   * Templates directory, where search for parsed files
   */
  templatesDirectory: string = path.resolve(__dirname, '../../templates')

  parser: Parser = null

  // -- CONSTRUCTOR
  constructor ({ templatesDirectory }: PagesOptions = {}) {
    if (templatesDirectory) {
      this.templatesDirectory = templatesDirectory
    }

    this.parser = new Parser()
  }

  /**
   * Get directory for template file in pages directory.
   * If anyPath is provided then path resolves to any file for given directory (`name` is path)
   *
   * @param name Name of the page
   * @param anyPath Should resolve any path, not only page
   * @returns Full resolved path to file in templates directory
   */
  path (name: string, anyPath?: boolean): string {
    return path.resolve(this.templatesDirectory, !anyPath ? 'pages' : '', `${name}.md`)
  }

  /**
   * Lists all pages in templates directory
   *
   * @returns List of pages
   */
  list (): string[] {
    try {
      const files = dirReadSync(path.resolve(this.templatesDirectory, 'pages'))

      return files.map((file: string) => file.replace('.md', ''))
    } catch (e) {
      return []
    }
  }

  /**
   * Parses content of given page and returns options and content
   *
   * @returns Page options and content
   */
  async page (name: string): Promise<object> {
    try {
      const content = await this.parser.cache.get(this.path(name))

      return this.parsePage(content)
    } catch (e) {
      console.error(e)

      return {
        options: {},
        components: []
      }
    }
  }

  /**
   * Parses page content - extracts options object and components list
   *
   * @param content Parsed markdown content object
   * @returns Object with options and components for page
   */
  parsePage (content: object): SinglePage {
    const getData = () => (content as SingleASTNode[])

    try {
      const components = getData().filter(elem => elem.type !== 'options')
      let options = getData().filter(elem => elem.type === 'options')

      // Parse options
      options = options.reduce(
        (previous, current) => ({ ...previous, ...current.attrs }), {}
      )

      return {
        options,
        components
      }
    } catch (e) {
      console.error(e)

      return {
        options: {
          title: null
        },
        components: []
      }
    }
  }

  /**
   * Parses global options file and returns its content
   *
   * @returns Object with options
   */
  async options (): Promise<object> {
    try {
      const content = await this.parser.cache.get(this.path('options', true))
      const { options } = this.parsePage(content)

      return options
    } catch (e) {
      console.error(e)

      return {
        title: null
      }
    }
  }
}

export default Pages
