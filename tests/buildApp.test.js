const path = require('path')
const fs = require('fs-extra')
const expect = require('chai').expect
const makeTestFolder = require('./fixtures/testUtils.js').makeTestFolder
const buildApp = require('../lib/buildApp.js')
const createConfig = require('../lib/createConfig.js')
const bddStdin = require('bdd-stdin')
const currentCwd = process.cwd()

it('should create correct answers object and file structure', function(done) {
  const archiveFolderPath = path.join(process.cwd(), './tests/fixtures/oneTemplate/boilerplate')
  const appFolderPath = path.join(process.cwd(), './tests/fixtures/autoGenBoilerplate')
  const boilerplateFolderPath = path.join(appFolderPath, './boilerplate')
  const files = ['Procfile',
                 'karma.conf.js',
                 'gulpfile.js',
                 'config']

  makeTestFolder(archiveFolderPath, appFolderPath, files)
  process.chdir(appFolderPath)

  createConfig(boilerplateFolderPath, () => {
    const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
    const config = require(ugenConfigPath)
    const expectedAnswers = { ENV_HOME: 'AppHomeDir' }

    bddStdin('AppHomeDir\n')
    buildApp(config).then((answers) => {
      expect(answers).to.be.deep.equal(expectedAnswers)
      fs.removeSync(appFolderPath)
      done()
    }).catch((err) => {console.log(`Test error ${err}`)})
    process.chdir(currentCwd)
  })

})
