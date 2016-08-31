const path = require('path')
const fs = require('fs-extra')
const expect = require('chai').expect
const makeTestFolder = require('./fixtures/testUtils.js').makeTestFolder
const buildApp = require('../lib/buildApp.js')
const createConfig = require('../lib/createConfig.js')
const bddStdin = require('bdd-stdin')
const currentCwd = process.cwd()
const archiveFolderPath = path.join(process.cwd(), './tests/fixtures/archiveBoilerplate')

describe('buildApp()', () => {
  it('should create correct answers object and file structure with one template', (done) => {
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
        process.chdir(currentCwd)
        done()
      }).catch((err) => {
        fs.removeSync(testFolderPath)
        process.chdir(currentCwd)
        done(err)
      })
    })
  })

  it('should create correct answers object and file structure with multiple templates', (done) => {
    const testFolderPath = makeTestFolder(archiveFolderPath)
    const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')
    process.chdir(testFolderPath)

    createConfig(boilerplateFolderPath, () => {
      const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
      const config = require(ugenConfigPath)
      const expectedAnswers = {'USERNAME:ENCRYPTED_PASSWORD_FOR_BASIC_AUTH': 'Djo Dow',
                               'ENV_HOME': 'AppHomeDir'}

      bddStdin('Djo Dow\n', 'AppHomeDir\n')
      buildApp(config).then((answers) => {
        expect(answers).to.be.deep.equal(expectedAnswers)
        fs.removeSync(testFolderPath)
        done()
        process.chdir(currentCwd)
      }).catch((err) => {
        fs.removeSync(testFolderPath)
        process.chdir(currentCwd)
        done(err)
      })
    })
  })

  it('should create file structure without templates', (done) => {
    const files = ['Procfile',
                   'karma.conf.js',
                   'gulpfile.js']
    const testFolderPath = makeTestFolder(archiveFolderPath, files)
    const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')
    process.chdir(testFolderPath)

    createConfig(boilerplateFolderPath, () => {
      const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
      const config = require(ugenConfigPath)

      buildApp(config).then(() => {
        const expectedFiles = fs.readdirSync(testFolderPath)
        const resultFiles = ['boilerplate',
                             'Procfile',
                             'karma.conf.js',
                             'gulpfile.js',
                             'ugen.config.js']

        expect(expectedFiles.length).to.be.equal(resultFiles.length)
        expect(expectedFiles).to.include.members(resultFiles)

        fs.removeSync(testFolderPath)
        process.chdir(currentCwd)
        done()
      }).catch((err) => {
        fs.removeSync(testFolderPath)
        process.chdir(currentCwd)
        done(err)
      })
    })
  })
})
