const path = require('path')
const fs = require('fs-extra')
const currentCwd = process.cwd()
const expect = require('chai').expect
const buildApp = require('../lib/buildApp.js')
const createConfig = require('../lib/createConfig.js')
const boilerplateWithOneTemplatePath = path.join(process.cwd(), './tests/fixtures/oneTemplate/boilerplate')
const bddStdin = require('bdd-stdin')

it('should create correct answers object and file structure', function(done) {
  process.chdir('./tests/fixtures/oneTemplate')

  createConfig(boilerplateWithOneTemplatePath, () => {

    const ugenConfigPath = path.join(process.cwd(), 'ugen.config.js')
    const config = require(ugenConfigPath)
    const expectedAnswers = { ENV_HOME: 'AppHomeDir' }
    const procfilePath = path.join(process.cwd(), 'Procfile')
    const karmaPath = path.join(process.cwd(), 'karma.conf.js')
    const gulpPath = path.join(process.cwd(), 'gulpfile.js')
    const configPath = path.join(process.cwd(), 'config')

    bddStdin('AppHomeDir\n')
    buildApp(config).then((answers) => {
      expect(answers).to.be.deep.equal(expectedAnswers)
      fs.unlinkSync(procfilePath)
      fs.unlinkSync(karmaPath)
      fs.unlinkSync(gulpPath)
      fs.removeSync(configPath)
      fs.unlinkSync(ugenConfigPath)
      done()
    }).catch((err) => {console.log(`Test error ${err}`)})
    process.chdir(currentCwd)
  })

})
