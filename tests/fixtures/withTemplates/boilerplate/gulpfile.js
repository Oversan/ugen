require('babel/register')({
  ignore: /node_modules/
})

require('require-dir')('./node_modules/src/js/utils/gulptasks/')
