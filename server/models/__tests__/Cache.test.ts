// -- CORE
import Cache, {
  DEFAULT_CACHE_DIR
} from '../Cache'
import { FILE_READ_PROBLEM, FILE_WRITE_PROBLEM, FILE_UNLINK_PROBLEM } from '../helpers/file'

jest.mock('fs')

// Mockup for filestystem
const fs = require('fs')
const mock = fs.__mockFiles

// -- TEST
describe('Cache', () => {
  afterEach(() => {
    mock.restore()
  })

  describe('dir', () => {
    it('should return default dir if env is not provided', () => {
      const cache = new Cache()
      expect(cache.dir).toBe(DEFAULT_CACHE_DIR)
    })

    it('should read cache dir from envs', () => {
      process.env.CACHE_DIR = 'test_cache'

      const cache = new Cache()
      expect(cache.dir).toBe(process.env.CACHE_DIR)

      process.env.CACHE_DIR = undefined
    })
  })

  // -- FILES
  describe('files', () => {
    it('files should return list of cached files', () => {
      const cache = new Cache({ dir: DEFAULT_CACHE_DIR })

      // Mock directory
      mock({
        [cache.dir]: {
          'test.json': '',
          'test2.json': ''
        }
      })

      const files = cache.files()

      expect(files.length).toBe(2)
      expect(files[0]).toBe('test.json')
      expect(files[1]).toBe('test2.json')
    })
  })

  // -- GET
  describe('get', () => {
    it('should get single file from cache directory', () => {
      expect.assertions(1)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const filePath = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {
          [expectedFile]: '{"test":1}'
        } // empty dir
      })

      return expect(cache.get(filePath)).resolves.toStrictEqual({
        test: 1
      })
    })

    it('should throw error if files doesn\'t exists in cache directory', () => {
      expect.assertions(1)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const nonExisting = 'templates/Error.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {
          [expectedFile]: '{"test":1}'
        } // empty dir
      })

      return expect(cache.get(nonExisting)).rejects.toThrowError(FILE_READ_PROBLEM)
    })

    it('should throw error if file couldn\'t be parsed', () => {
      expect.assertions(1)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const file = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {
          [expectedFile]: '[test}'
        } // empty dir
      })

      return expect(cache.get(file)).rejects.toThrowError(FILE_READ_PROBLEM)
    })
  })

  // -- EXIST
  describe('exists', () => {
    it('should parse given path into cached file path', () => {
      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const filePath = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {
          [expectedFile]: '{}'
        } // empty dir
      })

      expect(cache.exists(filePath)).toBe(true)
    })
  })

  // -- ADDING
  describe('add', () => {
    it('should add new files and add filename if cleanNames is true', async (done) => {
      expect.assertions(3)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const newFile = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {} // empty dir
      })

      let files = cache.files()
      expect(files.length).toBe(0)

      await cache.add(newFile, { a: 'test' })
      files = cache.files()
      expect(files.length).toBe(1)
      expect(files[0]).toBe(expectedFile)
      done()
    })

    it('should add new files without keeping names if cleanNames is false', async (done) => {
      expect.assertions(3)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: false })

      const newFile = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.json'

      // Mock directory
      mock({
        [cache.dir]: {} // empty dir
      })

      let files = cache.files()
      expect(files.length).toBe(0)

      await cache.add(newFile, { a: 'test' })
      files = cache.files()
      expect(files.length).toBe(1)
      expect(files[0]).toBe(expectedFile)
      done()
    })

    it('should throw error if directory is not writable', async (done) => {
      expect.assertions(3)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: false })

      const newFile = 'templates/Home.md'

      // Mock directory
      mock({})

      let files = cache.files()
      expect(files.length).toBe(0)

      try {
        await cache.add(newFile, { a: 'test' })
      } catch (e) {
        files = cache.files()

        expect(files.length).toBe(0)
        expect(e.message).toBe(FILE_WRITE_PROBLEM)

        done()
      }
    })
  })

  // -- DELETE
  describe('delete', () => {
    it('should delete file from cache directory', async (done) => {
      expect.assertions(2)

      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })

      const filePath = 'templates/Home.md'
      const expectedFile = '2af60a45b3aefa5d89654dc41b8a84b3.Home.json'

      // Mock directory
      mock({
        [cache.dir]: {
          [expectedFile]: '{}'
        } // empty dir
      })

      expect(cache.exists(filePath)).toBe(true)
      await cache.delete(filePath)
      expect(cache.exists(filePath)).toBe(false)
      done()
    })

    it('should throw error if file not exists', async (done) => {
      const cache = new Cache({ dir: DEFAULT_CACHE_DIR, cleanNames: true })
      const filePath = 'templates/Home.md'

      // Mock directory
      mock({
        [cache.dir]: {} // empty dir
      })

      expect(cache.exists(filePath)).toBe(false)
      try {
        await cache.delete(filePath)
      } catch (e) {
        expect(e.message).toBe(FILE_UNLINK_PROBLEM)
      }

      done()
    })
  })
})
