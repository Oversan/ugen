const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

function makeTestFolder(archiveFolderPath, appFolderPath, filesArray, options) {
  fs.mkdirs(appFolderPath)

  const globOptions = {
    cwd: archiveFolderPath,
    dot: true,
    ignore: '**/node_modules/**/*'
  }

  const files = filesArray || glob.sync("**/*", globOptions)

  files.forEach((file) => {
    var archiveFilePath = path.join(archiveFolderPath, file)
    var boilerplateFolderPath = path.join(appFolderPath, 'boilerplate')
    var boilerplateFilePath = path.join(boilerplateFolderPath, file)

    fs.copySync(archiveFilePath, boilerplateFilePath, options, (err) => {
      if (err) return console.error(err)
      console.log(`Created boilerplate file ${boilerplateFilePath}`)
    })
  })
}

module.exports = {
  makeTestFolder
}
