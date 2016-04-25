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
  mkdir appName && cd appName

  # Copy any files and templates in folder 'boilerplate'
  # Template file must have *.template extension
  # Inside of template should be tags like <% TAG_NAME %>
  mkdir boilerplate && cp some_dir/* ./boilerpalate

  # Create ugen.config.js
  ugen config
```

## Update ugen.config.js if you need

Config presented in json format. One of the properties of this config is "questions". For example, you can add validation function for every question. For this is used [validator.js](https://github.com/chriso/validator.js).

## Build app from package

```sh
  # Inside of Ugen package
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
