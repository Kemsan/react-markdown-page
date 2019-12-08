const path = require('path')

// Files data
const fs = {}

let mockFiles = {}
let mockSubDirs = {}

fs.__mockFiles = (dirList) => {
  mockSubDirs = {}
  mockFiles = {}

  const fileList = (directory, files, values) => {
    if (!values[directory]) {
      values[directory] = {}
    }

    if (!mockSubDirs[directory]) {
      mockSubDirs[directory] = []
    }

    Object.keys(files).forEach(file => {
      if (typeof files[file] === 'string') {
        values[directory][file] = files[file]

        return
      }

      mockSubDirs[directory].push(file)

      fileList(path.join(directory, file), files[file], values)
    })
  }
  const result = {}

  // Loop thru all files
  Object.keys(dirList).forEach(file => {
    fileList(file, dirList[file], result)
  })

  mockFiles = result
}

fs.__mockFiles.restore = () => {
  mockFiles = {}
  mockSubDirs = {}
}

// Mock fs methods

// Read file
fs.readFileSync = (file, options) => {
  if (!file) {
    throw Error('Missing path for file')
  }

  const info = path.parse(file)

  if (!mockFiles[info.dir]) {
    throw Error(`Directory ${info.dir} not exists`)
  }

  if (!fs.existsSync(file)) {
    throw Error(`Missing file ${file}`)
  }

  return Buffer.from(
    mockFiles[info.dir][info.base] || '',
    (options && options.encoding) || 'utf-8'
  )
}

fs.readFile = (file, options, cb) => {
  if (!options || typeof options === 'function') {
    cb = options
    options = {}
  }

  try {
    const content = fs.readFileSync(file, options)

    cb(null, content)
  } catch (e) {
    cb(e, null)
  }
}

// Read dir
fs.readdirSync = (dir) => {
  if (!dir || !mockFiles[dir]) {
    throw Error(`Missing directory ${dir}`)
  }

  const files = Object.keys(mockFiles[dir]) || []
  const dirs = mockSubDirs[dir] || []

  return [...files, ...dirs] || []
}

fs.readdir = (dir, cb) => {
  try {
    cb(null, fs.readdirSync(dir))
  } catch (e) {
    cb(e, null)
  }
}

// Dir exists
fs.direxistsSync = (dir) => {
  if (!dir || !mockFiles[dir]) {
    throw Error(`Missing directory ${dir}`)
  }

  return true
}

fs.dirExists = (dir, cb) => {
  try {
    cb(null, fs.direxistsSync(dir))
  } catch (e) {
    cb(e, false)
  }
}

// Unlink file
fs.unlinkSync = (file) => {
  if (!path) {
    throw Error('Missing path for file')
  }

  const info = path.parse(file)

  if (!fs.direxistsSync(info.dir)) {
    throw Error(`Directory ${info.dir} not exists`)
  }

  if (!fs.existsSync(file)) {
    throw Error(`File ${file} not exists`)
  }

  delete mockFiles[info.dir][info.base]

  return true
}

fs.unlink = (file, cb) => {
  try {
    cb(null, fs.unlinkSync(file))
  } catch (e) {
    cb(e, false)
  }
}

// Info about file
fs.statSync = (file) => {
  if (!fs.existsSync(file)) {
    throw Error(`File ${file} not exists`)
  }

  const stats = {
    dev: 2114,
    ino: 48064969,
    mode: 33188,
    nlink: 1,
    uid: 85,
    gid: 100,
    rdev: 0,
    size: 527,
    blksize: 4096,
    blocks: 8,
    atimeMs: 1318289051000.1,
    mtimeMs: 1318289051000.1,
    ctimeMs: 1318289051000.1,
    birthtimeMs: 1318289051000.1,
    atime: new Date(),
    mtime: new Date(),
    ctime: new Date(),
    birthtime: new Date()
  }

  const info = path.parse(file)

  stats.isDirectory = () => !(mockFiles[info.dir] && mockFiles[info.dir][info.base] !== undefined)
  stats.isFile = () => !stats.isDirectory()
  stats.isBlockDevice = () => false
  stats.isCharacterDevice = () => false
  stats.isFIFO = () => false
  stats.isSocket = () => false
  stats.isSymbolicLink = () => false

  return stats
}

fs.stat = (file, cb) => {
  try {
    cb(null, fs.statSync(file))
  } catch (e) {
    cb(e, null)
  }
}

// Exists file
fs.existsSync = (file) => {
  try {
    if (!path) {
      return false
    }

    const info = path.parse(file)

    if (!fs.direxistsSync(info.dir)) {
      return false
    }

    return (
      mockFiles[info.dir][info.base] !== undefined ||
      mockSubDirs[info.dir].includes(info.base)
    )
  } catch (e) {
    return false
  }
}

fs.exists = (file, cb) => {
  try {
    cb(null, fs.existsSync(file))
  } catch (e) {
    cb(e, null)
  }
}

// Write file
fs.writeFileSync = (file, options, content) => {
  if (!content) {
    content = options
  }

  if (!path) {
    throw Error('Missing path for file')
  }

  const info = path.parse(file)

  mockFiles[info.dir][info.base] = content
}

fs.writeFile = (file, data, options, cb) => {
  if (!options || typeof options === 'function') {
    cb = options
    options = {}
  }

  try {
    cb(null, fs.writeFileSync(file, data, options))
  } catch (e) {
    cb(e, null)
  }
}

module.exports = fs
