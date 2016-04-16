const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const readWriteTemplate = require('../lib/helpers.js').readWriteTemplate
const readWriteTemplateFromConfig = require('../lib/helpers.js').readWriteTemplateFromConfig

describe('Helpers for read/write templates', () => {
  const templatePath = path.join(process.cwd(), './tests/fixtures/example.package.json.template')
  const expectedPath = path.join(process.cwd(), './tests/fixtures/example.package.json.expected')
  const resultPath = path.join(process.cwd(), './tests/fixtures/example.package.json')
  const arrayParams = [
    ['REPO_NAME','NewApp'],
    ['GIT_URL', 'https://github.com/apporg/appname']
  ]
  const arrayOfKeysParams = [
    'REPO_NAME',
    'GIT_URL'
  ]
  const answers = {
    REPO_NAME: 'NewApp',
    GIT_URL: 'https://github.com/apporg/appname'
  }

  it('readWriteTemplate() should create correct file from template ', () => {
    readWriteTemplate(templatePath, resultPath, arrayParams)
    const resultData = fs.readFileSync(resultPath, 'utf-8')
    const correctData = fs.readFileSync(expectedPath, 'utf-8')
    expect(correctData).to.be.eql(resultData)
    fs.unlinkSync(resultPath)
  })

  it('readWriteTemplateFromConfig() should create correct file from template ', () => {
    readWriteTemplateFromConfig(templatePath, resultPath, arrayOfKeysParams, answers)
    const resultData = fs.readFileSync(resultPath, 'utf-8')
    const correctData = fs.readFileSync(expectedPath, 'utf-8')
    expect(correctData).to.be.eql(resultData)
    fs.unlinkSync(resultPath)
  })
})
