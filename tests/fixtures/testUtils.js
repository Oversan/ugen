const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

function makeTestFolder(archiveFolderPath, filesArray, appFolderPath) {
  const appPath = appFolderPath || path.join(process.cwd(), './tests/fixtures/autoGenBoilerplate')
  const testFolderPath = fs.mkdtempSync(appPath)

  const globOptions = {
    cwd: archiveFolderPath,
    dot: true,
    ignore: '**/node_modules/**/*'
  }

  const files = filesArray || glob.sync("**/*", globOptions)

  files.forEach((file) => {
    const archiveFilePath = path.join(archiveFolderPath, file)
    const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')
    const boilerplateFilePath = path.join(boilerplateFolderPath, file)

    fs.copySync(archiveFilePath, boilerplateFilePath)
  })

  return testFolderPath
}

module.exports = {
  makeTestFolder
}
