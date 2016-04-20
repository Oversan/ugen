const path = require('path')
const fs = require('fs-extra')
const expect = require('chai').expect
const makeTestFolder = require('./fixtures/testUtils.js').makeTestFolder
const createConfig = require('../lib/createConfig.js')
const currentCwd = process.cwd()
const archiveFolderPath = path.join(process.cwd(), './tests/fixtures/archiveBoilerplate')

describe('createConfig()', () => {
  it('should create config from path with boilerplate folder without templates', (done) => {
    const files = ['Procfile',
                   'karma.conf.js',
                   'gulpfile.js',
                   'readme.md']

    const testFolderPath = makeTestFolder(archiveFolderPath, files)
    const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')

    process.chdir(testFolderPath)
    createConfig(boilerplateFolderPath, () => {
      const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
      const config = require(ugenConfigPath)

      expect(config).to.be.an('object')
      expect(config['templatesVariables']).to.deep.equal([])

      fs.removeSync(testFolderPath)
      process.chdir(currentCwd)
      done()
    })
  })

  it('should create config from path with boilerplate folder with templates', (done) => {
    const files = ['Procfile',
                   'karma.conf.js',
                   'gulpfile.js',
                   'readme.md',
                   'config']

    const testFolderPath = makeTestFolder(archiveFolderPath, files)
    const boilerplateFolderPath = path.join(testFolderPath, 'boilerplate')

    process.chdir(testFolderPath)
    createConfig(boilerplateFolderPath, () => {
      const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
      const config = require(ugenConfigPath)
      const expectedArray = [
        {
          "config/htpasswd.template": [
            "USERNAME:ENCRYPTED_PASSWORD_FOR_BASIC_AUTH"
          ]
        },
        {
          "config/nginx.conf.template": [
            "ENV_HOME"
          ]
        }
      ]
      expect(config).to.be.an('object')
      expect(config['templatesVariables']).to.deep.equal(expectedArray)

      fs.removeSync(testFolderPath)
      process.chdir(currentCwd)
      done()
    })
  })
})
