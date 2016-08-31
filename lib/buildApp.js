const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const helpers = require('./helpers')

const kebabCase = helpers.kebabCase
const readWriteTemplateFromConfig = helpers.readWriteTemplateFromConfig

function isNotFile(filePath, boilerplatePath) {
  return filePath.indexOf(boilerplatePath) === -1
}

function askQuestionsAndBuild(config) {
  const boilerplatePath = config.boilerplatePath
  const nodeModulesPath = path.join(process.cwd(), 'node_modules')
  const questions = config.questions
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
        if (isNotFile(item.path, boilerplatePath) && isNotFile(item.path, nodeModulesPath)) {
          console.log(chalk.gray('Created: ') + chalk.green(item.path))
        }
      })
      .on('end', function () {
        console.log(chalk.yellow('Now you can install dependencies with ') + chalk.white('"$ npm install"'))
      })

    return answers
  }

  return inquirer.prompt(questions).then(createStructure)
}

function buildApp(config) {
  if (config.templatesVariables.length) {
    return askQuestionsAndBuild(config)
  } else {
    return new Promise((resolve, reject) => {
      fs.copy(config.boilerplatePath, process.cwd(), (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}

module.exports = buildApp
