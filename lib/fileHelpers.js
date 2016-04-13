const fs = require('fs')
const mkdirp = require('mkdirp')

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

function writeFiles(dirpath, files) {
  files.forEach((file) => {
    writeFile(dirpath + file)
  })
}

function isDir(path) {
  try {
    const stats = fs.statSync(path)
    return stats.isDirectory()
  } catch(err) {
    return false
  }
}

module.exports = {
  mkdir,
  loadFile,
  writeFile,
  appendFile,
  loadFiles,
  writeFiles,
  isDir
}
