const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const helpers = require('./helpers')

const kebabCase = helpers.kebabCase
const readWriteTemplateFromConfig = helpers.readWriteTemplateFromConfig

function isNotBoilerplateFile(filePath, boilerplatePath) {
  return filePath.indexOf(boilerplatePath) === -1
}

function buildApp(config) {
  const questions = config.questions
  const boilerplatePath = config.boilerplatePath
  const appPath = process.cwd()


  const createStructure = (answers) => {
    fs.copySync(boilerplatePath, appPath, {
      filter: (s) => {
        return !(/.template$/i.test(s))
      }
    })

    config.templatesVariables.forEach((item) => {
      for (var template in item) {
        var srcFile = path.join(boilerplatePath, template)
        var destFile = path.join(appPath, template.match(/.*(?=\.template)/)[0])

        readWriteTemplateFromConfig(srcFile, destFile, item[template], answers)
      }
    })

    fs.walk(appPath)
      .on('data', function (item) {
        if (isNotBoilerplateFile(item.path, boilerplatePath)) {
          console.log(chalk.gray('Created: ') + chalk.green(item.path))
        }
      })
      .on('end', function () {
        console.log(chalk.yellow('Now you can install dependencies with ') + chalk.white('"$ npm install"'))
      })
  }

  inquirer.prompt(questions).then(createStructure)
}

module.exports = buildApp
