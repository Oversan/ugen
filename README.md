# Ugen
[![Build Status](https://travis-ci.org/Oversan/ugen.svg?branch=master)](https://travis-ci.org/Oversan/ugen)
[![Code Climate](https://codeclimate.com/github/Oversan/ugen/badges/gpa.svg)](https://codeclimate.com/github/Oversan/ugen)
[![Test Coverage](https://codeclimate.com/github/Oversan/ugen/badges/coverage.svg)](https://codeclimate.com/github/Oversan/ugen/coverage)
[![npm version](https://badge.fury.io/js/ugen.svg)](https://badge.fury.io/js/ugen)

CLI tool for scaffolding new apps.

## Install

```sh
  npm i -g ugen
```

## Create Ugen package

```sh
  # Create package folder
  mkdir APP_DIR_NAME && cd APP_DIR_NAME

  # Copy some files and templates in folder 'boilerplate'
  # Template file must have *.template extension
  # There are should be placed tags like <% TAG_NAME %> inside a template
  mkdir boilerplate && cp SOME_DIR/* ./boilerpalate

  # Create ugen.config.js
  ugen config
```

## Update ugen.config.js if you need

Config is presented in json format. One of the properties of this config is "questions". For example, you can add validation function for every question. It would be great to use [validator.js](https://github.com/chriso/validator.js) for this purpose.

## Build app from package

```sh
  # Build app from Ugen package folder
  ugen build

  # After that you can remove 'boilerplate' folder from app
  rm -rf boilerplate
```

## Demo

[![](https://raw.githubusercontent.com/Oversan/ugen/master/example/demo.gif)]()

## Try Example

```sh
  npm i -g ugen
  git clone git@github.com:Oversan/ugen.git && cd ugen/example
  ugen config
  ugen build
  # rm -rf ./boilerplate
  npm i
```

## License
[MIT license](https://opensource.org/licenses/MIT)
