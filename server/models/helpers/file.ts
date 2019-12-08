// -- CORE
import * as fs from 'fs'
import * as path from 'path'
import flatten, { DeepArray } from './flatten'

// -- MESSAGES
export const FILE_READ_PROBLEM = 'File can not be read'
export const FILE_READIR_PROBLEM = 'Directory can not be read'
export const FILE_STAT_PROBLEM = 'File stats can not be read'
export const FILE_WRITE_PROBLEM = 'File can not be written'
export const FILE_UNLINK_PROBLEM = 'File can not be deleted'
export const FILE_EXISTS_PROBLEM = 'Missing file'

/**
 * Reads asynchronously file content for given path
 *
 * @param filePath Path for file
 * @returns Promise for file read
 */
export const fileRead = (filePath: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(new Error(FILE_READ_PROBLEM))

      return
    }

    resolve(String(data))
  })
})

/**
 * Reads synchronously file content for given path
 *
 * @param filePath Path for file
 * @returns File content
 */
export const fileReadSync = (filePath: string): string => {
  try {
    return String(fs.readFileSync(filePath))
  } catch (e) {
    throw Error(FILE_READ_PROBLEM)
  }
}

/**
 * Reads asynchronously file information
 *
 * @param filePath Path to file
 * @returns File information
 */
export const fileStat = (filePath: string): Promise<fs.Stats> => new Promise((resolve, reject) => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      reject(new Error(FILE_STAT_PROBLEM))

      return
    }

    resolve(stats)
  })
})

/**
 * Reads ynchronously file information
 *
 * @param filePath Path to file
 * @returns File information
 */
export const fileStatSync = (filePath: string): fs.Stats => {
  try {
    return fs.statSync(filePath)
  } catch (e) {
    throw Error(FILE_STAT_PROBLEM)
  }
}

/**
 * Reads asynchronously the contents of a directory and returns list of files for directory.
 * If _deep_ is provided then directory is deep searched and all paths are returned
 *
 * @param directory Directory path
 * @param pathResolve Resolve full path for files
 * @param deep Search deeply
 * @returns List of files for directory
 */
export const dirRead = async (
  directory: string,
  pathResolve?: boolean,
  deep?: boolean
): Promise<DeepArray<string>> => {
  const getFiles = (): Promise<string[]> => new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(new Error(FILE_READIR_PROBLEM))

        return
      }

      resolve(files)
    })
  })

  try {
    let files = await getFiles()

    if (pathResolve || deep) {
      files = files.map(file => path.join(directory, file))
    }

    if (deep) {
      return Promise.all(
        files.map(async file => {
          const stats = await fileStat(file)
          const single = stats.isDirectory() ? dirRead(file, pathResolve, deep) : file

          return single
        })
      ).then((data: string[]) => flatten(data))
    }

    return files
  } catch (e) {
    throw Error(FILE_READIR_PROBLEM)
  }
}

/**
 * Reads synchronously the contents of a directory and returns list of files for directory.
 * If _deep_ is provided then directory is deep searched and all paths are returned
 *
 * @param directory Directory path
 * @param pathResolve Resolve full path for files
 * @param deep Search deeply
 * @returns List of files for directory
 */
export const dirReadSync = (
  directory: string,
  pathResolve?: boolean,
  deep?: boolean
): DeepArray<string> => {
  try {
    let files: string[] = fs.readdirSync(directory)

    if (pathResolve || deep) {
      files = files.map(file => path.join(directory, file))
    }

    if (deep) {
      files = flatten(
        files.map(file => {
          const stats = fileStatSync(file)

          return stats.isDirectory() ? dirReadSync(file, pathResolve, deep) : file
        })
      ) as string[]
    }

    return files
  } catch (e) {
    throw Error(FILE_READIR_PROBLEM)
  }
}

/**
 * Write asynchronously value into file
 *
 * @param filePath Path to file
 * @param value Value which should be written
 * @returns Was file write
 */
export const fileWrite = (filePath: string, value: string): Promise<boolean> => new Promise((resolve, reject) => {
  fs.writeFile(filePath, value, (err) => {
    if (err) {
      reject(new Error(FILE_WRITE_PROBLEM))

      return
    }

    resolve(true)
  })
})

/**
 * Write synchronously value into file
 *
 * @param filePath Path to file
 * @param value Value which should be written
 * @returns Was file write
 */
export const fileWriteSync = (filePath: string, value: string): boolean => {
  try {
    fs.writeFileSync(filePath, value)

    return true
  } catch (e) {
    throw Error(FILE_WRITE_PROBLEM)
  }
}

/**
 * Removes asynchronously file from given path
 *
 * @param filePath Path to file
 * @return Was file removed
 */
export const fileRemove = (filePath: string): Promise<boolean> => new Promise((resolve, reject) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      resolve(false)

      return
    }

    resolve(true)
  })
})

/**
 * Removes synchronously file from given path
 *
 * @param filePath Path to file
 * @return Was file removed
 */
export const fileRemoveSync = (filePath: string): boolean => {
  try {
    fs.unlinkSync(filePath)

    return true
  } catch (e) {
    return false
  }
}

/**
 * Checks synchronously if file exists at given path
 *
 * @param filePath Path to file
 * @return File existing or not
 */
export const fileExistsSync = (filePath: string): boolean => fs.existsSync(filePath)

/**
 * Checks asynchronously if file exists at given path
 *
 * @param filePath Path to file
 * @return File existing or not
 */
export const fileExists = (filePath: string): Promise<boolean> => new Promise((resolve) => {
  fs.stat(filePath, (err) => {
    if (err) {
      resolve(false)

      return
    }

    resolve(true)
  })
})
