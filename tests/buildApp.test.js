const path = require('path')
const fs = require('fs-extra')
const expect = require('chai').expect
const makeTestFolder = require('./fixtures/testUtils.js').makeTestFolder
const buildApp = require('../lib/buildApp.js')
const createConfig = require('../lib/createConfig.js')
const bddStdin = require('bdd-stdin')
const currentCwd = process.cwd()
const archiveFolderPath = path.join(process.cwd(), './tests/fixtures/archiveBoilerplate')

it('should create correct answers object and file structure', function(done) {
  const files = ['Procfile',
                 'karma.conf.js',
                 'gulpfile.js',
                 'config/nginx.conf.template']

  const testFolderPath = makeTestFolder(archiveFolderPath, files)
  const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')
  process.chdir(testFolderPath)

  createConfig(boilerplateFolderPath, () => {
    const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
    const config = require(ugenConfigPath)
    const expectedAnswers = { ENV_HOME: 'AppHomeDir' }

    bddStdin('AppHomeDir\n')
    buildApp(config).then((answers) => {
      expect(answers).to.be.deep.equal(expectedAnswers)
      fs.removeSync(testFolderPath)
      done()
    }).catch((err) => {console.log(`Test error ${err}`)})
    process.chdir(currentCwd)
  })

})
