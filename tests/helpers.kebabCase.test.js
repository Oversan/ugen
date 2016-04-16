const expect = require('chai').expect
const kebabCase = require('../lib/helpers.js').kebabCase

describe('Helper kebaCase()', () => {
  it('should return string in kebabcase format from string with "-" chars should', () => {
    expect(kebabCase('--This-is-Good--Example--')).to.be.eql('this-is-good-example')
  })

  it('should return string in kebabcase format from string with "_" chars should', () => {
    expect(kebabCase('__This__is_Good_Example__')).to.be.eql('this-is-good-example')
  })

  it('should return string in kebabcase format from string with big letters and spaces', () => {
    expect(kebabCase('This Is Good Example')).to.be.eql('this-is-good-example')
  })

  it('should return string in kebabcase format from camelCase format string', () => {
    expect(kebabCase('AnotherExampleThatShouldBe')).to.be.eql('another-example-that-should-be')
  })

  it('should return string in kebabcase format from string with mess format', () => {
    expect(kebabCase('__--This_is GoodExample__--')).to.be.eql('this-is-good-example')
  })

  it('should return string in kebabcase format from string in kebabcase', () => {
    expect(kebabCase('this-is-good-example')).to.be.eql('this-is-good-example')
  })
})
