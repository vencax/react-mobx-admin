var babelOptions = {
  'presets': ['react', 'stage-0', ['es2015']],
  'plugins': [
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

var opts = Object.assign({
  babelrc: false,
  ignore: /node_modules(?!\/react-mobx-admin)/ // they aren't compiled.
}, babelOptions)

require('babel-register')(opts)

global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator
