const loadFile = require('./fileHelpers').loadFile
const writeFile = require('./fileHelpers').writeFile

function isMap(m) {
  return (Object.prototype.toString.apply(m) === '[object Map]')
}

function isArray(arr) {
  return Array.isArray(arr)
}

function isString(s) {
  return (typeof s === 'string');
}

function kebabCase(string) {
  return string.split(/[_-\s]+/)
               .filter(item => item !== '')
               .map(item => item.match(/(^[a-z]+)|([A-Z]+[a-z]*)/g))
               .toString()
               .split(',')
               .join('-')
               .toLowerCase()
}

function readWriteTemplate(filepath, destFilePath, params) {
  if (!isArray(params)) return false

  var data = loadFile(filepath)
  var newValue = data
  params.forEach((value) => {
    if (!isArray(value)) return false

    newValue = newValue.replace(new RegExp("<%[\\s=-]*" + value[0] + "[\\s=-]*%>", 'g'), value[1])
  })

  writeFile(destFilePath, newValue)
}

function readWriteTemplateFromConfig(filepath, destFilePath, params, answers) {
  if (!isArray(params)) return false

  var data = loadFile(filepath)
  params.forEach((value) => {
    data = data.replace(new RegExp("<%[\\s=-]*" + value + "[\\s=-]*%>", 'g'), answers[value])
  })

  writeFile(destFilePath, data)
}

module.exports = {
  isMap,
  isArray,
  isString,
  kebabCase,
  readWriteTemplate,
  readWriteTemplateFromConfig
}
