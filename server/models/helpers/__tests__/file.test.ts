// -- CORE
import * as path from 'path'
import * as file from '../file'

jest.mock('fs')

// Mockup for filestystem
const fs = require('fs')
const mock = fs.__mockFiles

// -- TEST
describe('file', () => {
  afterEach(() => {
    mock.restore()
  })

  describe('read', () => {
    it('should throw error if file not exists', async (done) => {
      expect.assertions(2)

      const testPath = 'test/testfile.json'

      // Mock empty directory
      mock({
        test: {}
      })

      expect(() => {
        file.fileReadSync(testPath)
      }).toThrowError(file.FILE_READ_PROBLEM)

      try {
        await file.fileRead(testPath)
      } catch (e) {
        expect(e.message).toBe(file.FILE_READ_PROBLEM)

        done()
      }
    })

    it('should allow to read file', async (done) => {
      const expectedValue = 'Test 1234'

      mock({
        test: {
          'testfile.json': expectedValue
        }
      })

      expect(file.fileReadSync('test/testfile.json')).toBe(expectedValue)
      expect(await file.fileRead('test/testfile.json')).toBe(expectedValue)
      done()
    })
  })

  describe('stat', () => {
    it('should return stat about file', async (done) => {
      const testPtah = 'test/testfile.json'

      mock({
        test: {
          'testfile.json': ''
        }
      })

      expect(file.fileStatSync(testPtah).isFile()).toBe(true)
      expect(await file.fileStat(testPtah).then(s => s.isFile())).toBe(true)

      done()
    })

    it('should throw error if file not exists', async (done) => {
      const testPath = 'test/testfile.json'

      mock({
        test: {}
      })

      expect(() => {
        file.fileStatSync(testPath)
      }).toThrowError(file.FILE_STAT_PROBLEM)

      try {
        await file.fileStat(testPath)
      } catch (e) {
        expect(e.message).toBe(file.FILE_STAT_PROBLEM)
      }

      return done()
    })
  })

  describe('dir', () => {
    it('should read directory content', async (done) => {
      const searchDirectory = 'test'
      const files = {
        test: '1',
        test2: '2',
        test3: '3'
      }
      const fileList = Object.keys(files)

      mock({
        [searchDirectory]: files
      })

      expect(file.dirReadSync(searchDirectory)).toStrictEqual(fileList)
      expect(await file.dirRead(searchDirectory)).toStrictEqual(fileList)

      done()
    })

    it('should resolve full paths for files', async (done) => {
      const searchDirectory = 'test'
      const files = {
        test: '1',
        test2: '2',
        test3: '3'
      }
      const fileList = Object.keys(files).map(file => path.join(`test/${file}`))

      mock({
        [searchDirectory]: files
      })

      expect(file.dirReadSync(searchDirectory, true)).toStrictEqual(fileList)
      expect(await file.dirRead(searchDirectory, true)).toStrictEqual(fileList)

      done()
    })

    it('should read directory deeply', async (done) => {
      const searchDirectory = 'test'
      const files = {
        test: '1',
        subDir: {
          test2: '2'
        }
      }
      const fileList = ['test/test', 'test/subDir/test2']

      mock({
        [searchDirectory]: files
      })

      expect(file.dirReadSync(searchDirectory, false, true)).toStrictEqual(fileList)
      expect(await file.dirRead(searchDirectory, false, true)).toStrictEqual(fileList)

      done()
    })

    it('should throw error when directory not exists', async (done) => {
      const searchDirectory = 'test'

      mock({})

      expect(() => {
        file.dirReadSync(searchDirectory)
      }).toThrowError(file.FILE_READIR_PROBLEM)
      try {
        await file.dirRead(searchDirectory)
      } catch (e) {
        expect(e.message).toBe(file.FILE_READIR_PROBLEM)
      }

      done()
    })
  })

  describe('write', () => {
    it('should create file if not exists', async (done) => {
      expect.assertions(6)

      const expectedPath = 'test/test.json'
      const expectedValue = 'Test 1234'

      mock({
        test: {}
      })

      expect(file.fileExistsSync(expectedPath)).toBe(false)
      expect(file.fileWriteSync(expectedPath, expectedValue)).toBe(true)
      expect(file.fileExistsSync(expectedPath)).toBe(true)

      mock({
        test: {}
      })

      expect(file.fileExistsSync(expectedPath)).toBe(false)
      expect(await file.fileWrite(expectedPath, expectedValue)).toBe(true)
      expect(file.fileExistsSync(expectedPath)).toBe(true)

      done()
    })

    it('should throw error when directory not exists', async (done) => {
      mock({})

      const expectedPath = 'test/test.json'
      const expectedValue = 'Test 1234'

      expect(() => {
        file.fileWriteSync(expectedPath, expectedValue)
      }).toThrowError(file.FILE_WRITE_PROBLEM)

      try {
        await file.fileWrite(expectedPath, expectedValue)
      } catch (e) {
        expect(e.message).toBe(file.FILE_WRITE_PROBLEM)
      }

      done()
    })
  })

  describe('remove', () => {
    it('should remove file from given path', async (done) => {
      expect.assertions(6)

      const filePath = 'test/test.json'

      mock({
        test: {
          'test.json': ''
        }
      })

      expect(file.fileExistsSync(filePath)).toBe(true)
      expect(file.fileRemoveSync(filePath)).toBe(true)
      expect(file.fileExistsSync(filePath)).toBe(false)

      mock({
        test: {
          'test.json': ''
        }
      })

      expect(file.fileExistsSync(filePath)).toBe(true)
      expect(await file.fileRemove(filePath)).toBe(true)
      expect(file.fileExistsSync(filePath)).toBe(false)

      done()
    })

    it('should return false if file was not removed', async (done) => {
      expect.assertions(2)

      const filePath = 'test/test.json'

      mock({
        test: {}
      })

      expect(file.fileRemoveSync(filePath)).toBe(false)
      expect(await file.fileRemove(filePath)).toBe(false)

      done()
    })
  })

  describe('exists', () => {
    it('should return true if file exists', async (done) => {
      expect.assertions(2)

      const filePath = 'test/test.json'

      mock({
        test: {
          'test.json': ''
        }
      })

      expect(file.fileExistsSync(filePath)).toBe(true)
      expect(await file.fileExists(filePath)).toBe(true)

      done()
    })

    it('should return false if file not exists', async (done) => {
      expect.assertions(2)

      const filePath = 'test/test.json'

      mock({})

      expect(file.fileExistsSync(filePath)).toBe(false)
      expect(await file.fileExists(filePath)).toBe(false)

      done()
    })
  })
})
