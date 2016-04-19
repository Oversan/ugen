const path = require('path')
const fs = require('fs-extra')
const currentCwd = process.cwd()
const expect = require('chai').expect
const sinon = require('sinon')
const buildApp = require('../lib/buildApp.js')
const config = require('./fixtures/oneTemplate/ugen.config.js')
const bddStdin = require('bdd-stdin')

it('should call save once', function(done) {
  process.chdir('./tests/fixtures/oneTemplate')
  const expectedAnswers = { ENV_HOME: 'AppHomeDir' }
  bddStdin('AppHomeDir\n')
  buildApp(config).then((answers) => {
    expect(answers).to.be.deep.equal(expectedAnswers)
    fs.unlinkSync(path.join(process.cwd(), 'Procfile'))
    fs.unlinkSync(path.join(process.cwd(), 'Karma.conf.js'))
    fs.unlinkSync(path.join(process.cwd(), 'gulpfile.js'))
    fs.removeSync(path.join(process.cwd(), 'config'))
    process.chdir(currentCwd)
    done()
  }).catch((err) => {console.log(`Test error ${err}`)})
})
