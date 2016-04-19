module.exports = {
  "questions": [
    {
      "name": "ENV_HOME",
      "type": "input",
      "message": "1. Question message or function (ENV_HOME)",
      // "validate": "Validation function there"
    }
  ],
  "templatesVariables": [
    {
      "config/nginx.conf.template": [
        "ENV_HOME"
      ]
    }
  ],
  "boilerplatePath": "/Users/aab/projects/ugen/tests/fixtures/oneTemplate/boilerplate"
}
