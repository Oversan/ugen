const path = require('path')
const fs = require('fs')
const expect = require('chai').expect
const currentCwd = process.cwd()
const boilerplateWithoutTemplatesPath = path.join(process.cwd(), './tests/fixtures/withoutTemplates/boilerplate')
const boilerplateWithTemplatesPath = path.join(process.cwd(), './tests/fixtures/withTemplates/boilerplate')
const createConfig = require('../lib/createConfig.js')

describe('createConfig()', () => {
  it('should create config from path with boilerplate folder without templates', (done) => {
    process.chdir('./tests/fixtures/withoutTemplates')
    createConfig(boilerplateWithoutTemplatesPath, () => {
      const resultData = require(path.join(process.cwd(), 'ugen.config.js'), 'utf-8')
      expect(resultData).to.be.an('object')
      expect(resultData['templatesVariables']).to.deep.equal([])
      fs.unlinkSync(path.join(process.cwd(), 'ugen.config.js'))
      process.chdir(currentCwd)
      done()
    })
  })

  it('should create config from path with boilerplate folder with templates', (done) => {
    process.chdir('./tests/fixtures/withTemplates')
    createConfig(boilerplateWithTemplatesPath, () => {
      const resultData = require(path.join(process.cwd(), 'ugen.config.js'), 'utf-8')
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
      expect(resultData).to.be.an('object')
      expect(resultData['templatesVariables']).to.deep.equal(expectedArray)
      fs.unlinkSync(path.join(process.cwd(), 'ugen.config.js'))
      process.chdir(currentCwd)
      done()
    })
  })
})
