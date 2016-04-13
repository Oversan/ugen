const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const glob = require('glob')
const chalk = require('chalk')
const _ = require('lodash')
const loadFile = require('./fileHelpers.js').loadFile
const writeFile = require('./fileHelpers.js').writeFile
const isDir = require('./fileHelpers.js').isDir
var boilerplatePath = path.join(process.cwd(), 'boilerplate')

if (argv.src && isDir(argv.src)) {
  boilerplatePath = argv.src
} else if (!isDir(boilerplatePath)) {
  console.log(chalk.yellow('You should have "boilerplate" folder in this place or add correct "--src"'))
  return false
}

const options = {
  cwd: boilerplatePath,
  dot: true,
  ignore: '**/node_modules/**/*'
}
const wordsInBraketsRegex = /(?!<%)(?![-=\s])([^%>\s]+)(?=[-=\s]*%>)/g

function getFile(file) {
  return loadFile(path.join(boilerplatePath, file))
}

glob('**/*.template', options, function(er, files) {
  const templatesConfigVariables = files.map((file) => {
    return {
      [file]: _.uniq(getFile(file).match(wordsInBraketsRegex))
    }
  })

  const allTemplateVariables = _.uniq(
    files.map(file => getFile(file).match(wordsInBraketsRegex))
         .toString()
         .split(','))

  const questions = allTemplateVariables.map((item, i) => {
    return {
      'name': item,
      'type': 'input',
      'message': `${i+1}. Question message or function (${item})`,
      'validate': 'Validation function there'
    }
  })

  function configTemplate(obj1, obj2) {
    var result = 'module.exports = ' + JSON.stringify(Object.assign({}, obj1, obj2, {boilerplatePath: path.resolve(boilerplatePath)}), null, 2)
    result = result.replace(/"validate"/g, '// "validate"')
    return result
  }

  writeFile(path.join(process.cwd(), 'config.js'), configTemplate({questions: questions}, {templatesVariables: templatesConfigVariables}))

  console.log('\n')
  console.log(chalk.yellow('Templates Config Variables:'))
  console.log(templatesConfigVariables)
  console.log('\n')

  console.log(chalk.yellow(`All Template Variables (${allTemplateVariables.length}) items):`))
  console.log(allTemplateVariables)
  console.log('\n')

  console.log(chalk.yellow(`Boilerplate path:`))
  console.log(boilerplatePath)
  console.log('\n')
})
