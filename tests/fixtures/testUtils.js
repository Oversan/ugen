const fs = require('fs-extra')
const path = require('path')

function makeTestFolder(archiveFolderPath, appFolderPath, filesArray, options) {
  fs.mkdirs(appFolderPath)

  filesArray.forEach((file) => {
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
