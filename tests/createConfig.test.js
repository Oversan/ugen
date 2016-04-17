const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const expect = require('chai').expect
const fixturesPath = path.join(process.cwd(), './tests/fixtures')
const boilerplatePath = path.join(process.cwd(), './tests/fixtures/boilerplate')
const createConfig = require('../lib/createConfig.js')
const loadFile = require('../lib/fileHelpers.js').loadFile

describe('createConfig()', () => {
  it('should create config from path with boilerplate folder without templates', (done) => {
    process.chdir('./tests/fixtures')
    createConfig(boilerplatePath, () => {
      const resultData = require(path.join(process.cwd(), 'ugen.config.js'), 'utf-8')
      expect(resultData).to.be.an('object')
      expect(resultData['templatesVariables']).to.deep.equal([])
      fs.unlinkSync(path.join(process.cwd(), 'ugen.config.js'))
      done()
    })
  })
})
