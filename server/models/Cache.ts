// -- CORE
import * as path from 'path'
import md5 from './helpers/md5'
import {
  fileWrite, dirReadSync, fileRead,
  fileRemove, fileExistsSync, FILE_READ_PROBLEM
} from './helpers/file'

// -- TYPING
export type FileAddResolve = (value: boolean) => void
export type FileAddReject = (reason: NodeJS.ErrnoException) => void

export interface CacheClass {
  dir: string
  cleanNames: boolean

  fileName: (filePath: string) => string

  path: (filePath: string) => string

  add: (filePath: string, value: object) => Promise<boolean>
  get: (filePath: string) => object | Error
  exists: (filePath: string) => boolean

  files: () => string[]
}

export interface CacheClassOptions {
  dir?: string
  cleanNames?: boolean
}

// -- DATA
export const DEFAULT_CACHE_DIR = path.resolve(__dirname, '../cache')

/** @namespace Cache */
class Cache implements CacheClass {
  /**
   * Cache directory path
   */
  dir: string = process.env.CACHE_DIR || DEFAULT_CACHE_DIR

  /**
   * Determines if names for files should be in clean form:
   * true: md5 of file path and file name as additional data (e.g. 193cfc9be3b995831c6af2fea6650e60.Page.json)
   * false: md5 of file path (e.g. 193cfc9be3b995831c6af2fea6650e60.json)
   */
  cleanNames: boolean = true

  /**
   * Creates Cache class
   *
   * @param options Object with Cache options
   * @param options.dir Cache directory
   * @param options.cleanNames Should use cleanNames for cached files
   */
  constructor ({ dir, cleanNames }: CacheClassOptions = {}) {
    if (dir) {
      this.dir = dir
    }

    if (cleanNames !== undefined) {
      this.cleanNames = cleanNames
    }
  }

  /**
   * Converts given path to file into cache file name
   *
   * @param filePath Path to template file
   * @returns Cached file name
   * @example
   *
   * // With Cache.cleanNames = true
   * Cache.path('pages/Home.md')
   * // => 8cf04a9734132302f96da8e113e80ce5.Home.json
   *
   * // With Cache.cleanNames = false
   * Cache.path('pages/Home.md')
   * // => 8cf04a9734132302f96da8e113e80ce5.json
   */
  fileName (filePath: string): string {
    const file = path.parse(filePath)
    let fileName = md5(filePath)

    if (this.cleanNames) {
      fileName = `${fileName}.${file.name}`
    }

    return `${fileName}.json`
  }

  /**
   * Creates path to cached file
   *
   * @param filePath Path to file
   * @returns Path to .json files
   * @example
   *
   * // With Cache.cleanNames = true
   * Cache.path('pages/Home.md')
   * // => ../cache/8cf04a9734132302f96da8e113e80ce5.Home.json
   *
   * // With Cache.cleanNames = false
   * Cache.path('pages/Home.md')
   * // => ../cache/8cf04a9734132302f96da8e113e80ce5.json
   */
  path (filePath: string): string {
    return path.resolve(this.dir, this.fileName(filePath))
  }

  /**
   *
   * @param filePath Path to file
   * @param value Value to put into cache file
   */
  add (filePath: string, value: object): Promise<boolean> {
    const dir = this.path(filePath)
    console.log(filePath, dir)
    const data = JSON.stringify(value)

    return fileWrite(dir, data)
  }

  /**
   * Deletes file from cache directory
   *
   * @param filePath Path to file
   * @returns Was file deleted
   */
  delete (filePath: string): Promise<boolean> {
    return fileRemove(this.path(filePath))
  }

  /**
   * Gets content of file and convert it into object.
   *
   * @param filePath Path to file
   * @returns Parsed file content into object
   */
  async get (filePath: string): Promise<object> {
    try {
      const content = await fileRead(this.path(filePath))

      return JSON.parse(content)
    } catch (e) {
      throw Error(FILE_READ_PROBLEM)
    }
  }

  /**
   * Checks if file for given path exists in cache directory
   *
   * @param name Path to file
   * @returns File existence in cache directory
   */
  exists (filePath: string): boolean {
    return fileExistsSync(this.path(filePath))
  }

  /**
   * Lists all stored files in cache directory
   *
   * @returns List of cached files
   */
  files (): string[] {
    let files = []

    try {
      files = dirReadSync(this.dir, false, false).filter(elem => elem.indexOf('.json') !== -1)
    } catch (e) {
      files = []
    }

    return files
  }
}

export default Cache
