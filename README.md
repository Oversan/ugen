# Ugen
[![Build Status](https://travis-ci.org/Oversan/ugen.svg?branch=master)](https://travis-ci.org/Oversan/ugen) [![Code Climate](https://codeclimate.com/github/Oversan/ugen/badges/gpa.svg)](https://codeclimate.com/github/Oversan/ugen) [![Test Coverage](https://codeclimate.com/github/Oversan/ugen/badges/coverage.svg)](https://codeclimate.com/github/Oversan/ugen/coverage)

CLI tool for scaffolding new apps.

## Install

```shell
  npm i -g ugen
```

## Create Ugen package

```shell
  // Create package folder
  mkdir appName && cd appName

  // Copy any files and templates in folder 'boilerplate'
  // Template file must have *.template extension
  // Inside of template should be tags like <% TAG_NAME %>
  mkdir boilerplate && cp some_dir/* ./boilerpalate

  // Create ugen.config.js
  ugen config
```

## Update ugen.config.js if you need

Config presented in json format. One of the properties of this config is "questions". For example, you can add validation function for every question. For this is used [validator.js](https://github.com/chriso/validator.js).

## Build app from package

```shell
  ugen build
```

## License
[MIT license](https://opensource.org/licenses/MIT)
