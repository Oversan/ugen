const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err
    console.log(chalk.gray('Created: ') + chalk.yellow(path))
    fn && fn()
  })
}

function loadFile(name) {
  return fs.readFileSync(name, 'utf-8')
}

function writeFile(filepath, str, mode) {
  fs.writeFileSync(filepath, str, { mode: mode || 0666 })
}

function appendFile(filepath, data) {
  fs.appendFileSync(filepath, data)
}

function loadFiles(dirpath) {
  return fs.readdirSync(dirpath)
}

function stats(path, obj) {
  try {
    const stats = fs.statSync(path)
    return stats[obj]()
  } catch(err) {
    return false
  }
}

function isDir(path) {
  return stats(path, 'isDirectory')
}

function isFile(path) {
  return stats(path, 'isFile')
}

module.exports = {
  mkdir,
  loadFile,
  writeFile,
  appendFile,
  loadFiles,
  isDir,
  isFile
}
