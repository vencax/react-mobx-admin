// const {getIfUtils, removeEmpty} = require('webpack-config-utils')
const path = require('path')

const babelOptions = {
  'presets': ['react', 'stage-0', ['es2015', {'modules': false}]],
  'plugins': [
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

module.exports = (env = {dev: true}) => {
  return {
    devtool: env.dev ? 'inline-sourcemap' : false,
    entry: './main.js',
    module: {
      loaders: [{test: /\.js$/, loader: 'babel-loader', options: babelOptions}]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.min.js'
    },
    externals: {
      'lodash': '_',
      'axios': 'axios',
      'mobx': 'mobx',
      'prop-types': 'prop-types',
      'mobx-react': 'mobxReact',
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
}
