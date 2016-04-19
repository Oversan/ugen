const path = require('path')
const fs = require('fs')
const expect = require('chai').expect
const sinon = require('sinon')
const buildApp = require('../lib/buildApp.js')
const config = require('./fixtures/oneTemplate/ugen.config.js')
const bddStdin = require('bdd-stdin')

it('should call save once', function(done) {
  const expectedAnswers = { ENV_HOME: 'AppHomeDir' }
  bddStdin('AppHomeDir\n')
  buildApp(config).then((answers) => {
    expect(answers).to.be.deep.equal(expectedAnswers)
    done()
  }).catch((err) => {console.log(`Test error ${err}`)})
})
