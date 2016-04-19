const path = require('path')
const fs = require('fs-extra')
const currentCwd = process.cwd()
const expect = require('chai').expect
const buildApp = require('../lib/buildApp.js')
const config = require('./fixtures/oneTemplate/ugen.config.js')
const bddStdin = require('bdd-stdin')

it('should create correct answers object and file structure', function(done) {
  process.chdir('./tests/fixtures/oneTemplate')
  const expectedAnswers = { ENV_HOME: 'AppHomeDir' }
  const procfilePath = path.join(process.cwd(), 'Procfile')
  const karmaPath = path.join(process.cwd(), 'Karma.conf.js')
  const gulpPath = path.join(process.cwd(), 'gulpfile.js')
  const configPath = path.join(process.cwd(), 'config')
  bddStdin('AppHomeDir\n')
  buildApp(config).then((answers) => {
    expect(answers).to.be.deep.equal(expectedAnswers)
    fs.unlinkSync(procfilePath)
    fs.unlinkSync(karmaPath)
    fs.unlinkSync(gulpPath)
    fs.removeSync(configPath)
    done()
  }).catch((err) => {console.log(`Test error ${err}`)})
  process.chdir(currentCwd)
})
