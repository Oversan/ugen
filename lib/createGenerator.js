const path = require('path')
const fs = require('fs-extra')
const config = require(path.join(process.cwd(), 'ugen.config.js'))
const inquirer = require('inquirer')
const chalk = require('chalk')
const helpers = require('./helpers')

const kebabCase = helpers.kebabCase
const readWriteTemplateFromConfig = helpers.readWriteTemplateFromConfig

const questions = config.questions

const generatorName = 'Generator'
const boilerplateRoot = config.boilerplatePath
const generatorRoot = process.cwd()

const createStructure = (answers) => {
  fs.copySync(boilerplateRoot, generatorRoot, {
    filter: (s) => {
      return !(/.template$/i.test(s))
    }
  })

  config.templatesVariables.forEach((item) => {
    for (var template in item) {
      var srcFile = path.join(boilerplateRoot, template)
      var destFile = path.join(generatorRoot, template.match(/.*(?=\.template)/)[0])

      readWriteTemplateFromConfig(srcFile, destFile, item[template], config, answers)
    }
  })

  fs.walk(generatorRoot).on('data', function (item) {
    console.log(chalk.gray('Created: ') + chalk.green(item.path))
  })

  console.log(chalk.yellow('Now you can open generated project ') + chalk.white(generatorName) + chalk.yellow(' and install dependencies with ') + chalk.white('"$ npm install"'))
}

inquirer.prompt(questions).then(createStructure)
