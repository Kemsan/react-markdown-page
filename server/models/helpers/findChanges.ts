// -- CORE
import * as fs from 'fs'
import * as path from 'path'

/**
 * Checks if file has content
 */
const isFileChanged = (content: string, value: string): boolean => content.indexOf(value) !== -1

/**
 * Method searches accross files in template directory if any file changes it content to matching value
 *
 * @param directory Directory to search for changed files
 * @param value Value to search in files
 * @returns Array of matched files
 */
const getChangedFiles = (directory: string, value: string): string[] => {
  try {
    const files = fs.readdirSync(directory)
    let result = []

    files.forEach(file => {
      const filePath = path.resolve(directory, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        result = result.concat(getChangedFiles(filePath, value))

        return
      }

      // Find in file
      const content = fs.readFileSync(filePath)
      const hasChanges = isFileChanged(content.toString(), value)

      if (hasChanges) {
        result.push(filePath)
      }
    })

    return result
  } catch (e) {
    return []
  }
}

export default getChangedFiles
