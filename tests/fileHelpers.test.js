const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const fileHelpers = require('../lib/fileHelpers.js')
const mkdir = fileHelpers.mkdir
const loadFile = fileHelpers.loadFile
const writeFile = fileHelpers.writeFile
const appendFile = fileHelpers.appendFile
const loadFiles = fileHelpers.loadFiles
const isDir = fileHelpers.isDir
const isFile = fileHelpers.isFile

describe('File helpers', () => {
  describe('mkdir()', () => {
    const tempDirPath = path.join(process.cwd(), './tests/fixtures/temp')

    it('should create dir with correct path', (done) => {
      mkdir(tempDirPath, () => {
        try {
          stats = fs.lstatSync(tempDirPath)
          expect(stats.isDirectory()).to.be.true
          fs.rmdirSync(tempDirPath)
          done()
        }
        catch (e) {
          console.log('Folder is not created')
        }
      })
    })

    it('should not create dir with empty path', (done) => {
      mkdir('', () => {
        try {
          stats = fs.lstatSync(tempDirPath)
        }
        catch (e) {
          done()
        }
      })
    })
  })

  describe('loadFile()', () => {
    const examplePath = path.join(process.cwd(), './tests/fixtures/archive/foo.md')
    const expectedText = '# Test file with some header\n'
    const data = loadFile(examplePath)

    it('should load file content', () => {
      expect(data).to.be.eql(expectedText)
    })

    it('file content should not by empty', () => {
      expect(data.length).to.be.above(0)
    })
  })

  describe('writeFile()', () => {
    const examplePath = path.join(process.cwd(), './tests/fixtures/fileExample.md')
    const exampleText = '# Test file with some header\n'

    it('should create file with content', () => {
      const file = writeFile(examplePath, exampleText)
      expect(loadFile(examplePath)).to.be.eql(exampleText)
      fs.unlinkSync(examplePath)
    })

    it('should create empty file', () => {
      const file = writeFile(examplePath, '')
      expect(loadFile(examplePath)).to.be.eql('')
      fs.unlinkSync(examplePath)
    })
  })

  describe('appendFile()', () => {
    const examplePath = path.join(process.cwd(), './tests/fixtures/fileExample.md')
    const exampleText = '# Test file with some header\n'
    const newLine = 'Begining of text\n'

    it('should append new line into file with content', () => {
      const file = writeFile(examplePath, exampleText)
      appendFile(examplePath, newLine)
      expect(loadFile(examplePath)).to.be.eql('# Test file with some header\nBegining of text\n')
      fs.unlinkSync(examplePath)
    })
  })

  describe('loadFiles()', () => {
    const examplePath = path.join(process.cwd(), './tests/fixtures/archive')
    const expectedFiles = ['bar.md', 'foo.md']

    it('should return array with filenames in folder', () => {
      const files = loadFiles(examplePath)
      expect(files).to.be.eql(expectedFiles)
    })
  })

  describe('isDir()', () => {
    const exampleDirPath = path.join(process.cwd(), './tests/fixtures/archive')
    const exampleFilePath = path.join(process.cwd(), './tests/fixtures/archive/foo.md')

    it('should return true when check valid dir path', () => {
      expect(isDir(exampleDirPath)).to.be.true
    })

    it('should return false when check valid file path', () => {
      expect(isDir(exampleFilePath)).to.be.false
    })
  })

  describe('isFile()', () => {
    const exampleDirPath = path.join(process.cwd(), './tests/fixtures/archive')
    const exampleFilePath = path.join(process.cwd(), './tests/fixtures/archive/foo.md')

    it('should return false when check valid dir path', () => {
      expect(isFile(exampleDirPath)).to.be.false
    })

    it('should return true when check valid file path', () => {
      expect(isFile(exampleFilePath)).to.be.true
    })
  })
})
