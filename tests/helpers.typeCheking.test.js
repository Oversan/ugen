const expect = require('chai').expect
const isMap = require('../lib/helpers.js').isMap
const isArray = require('../lib/helpers.js').isArray
const isString = require('../lib/helpers.js').isString

describe('Helpers on type checking', () => {
  const mapObj = new Map([["key1", "value1"], ["key2", "value2"]])
  const arr = ['One', 'Two', 3, 4, {five: 'value'}, [-23, -12]]
  const str = 'Strinzg value'

  describe('isMap', () => {
    it('should return true when check Map object', () => {
      expect(isMap(mapObj)).to.be.true
    })

    it('should return false when check Array object', () => {
      expect(isMap(arr)).to.be.false
    })

    it('should return false when check String object', () => {
      expect(isMap(str)).to.be.false
    })
  })

  describe('isArray', () => {
    it('should return false when check Map object', () => {
      expect(isArray(mapObj)).to.be.false
    })

    it('should return true when check Array object', () => {
      expect(isArray(arr)).to.be.true
    })

    it('should return false when check String object', () => {
      expect(isArray(str)).to.be.false
    })
  })

  describe('isString', () => {
    it('should return false when check Map object', () => {
      expect(isString(mapObj)).to.be.false
    })

    it('should return false when check Array object', () => {
      expect(isString(arr)).to.be.false
    })

    it('should return true when check String object', () => {
      expect(isString(str)).to.be.true
    })
  })
})
