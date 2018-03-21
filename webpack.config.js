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
    devtool: env.dev ? 'inline-sourcemap' : 'source-map',
    entry: './src/main.js',
    module: {
      loaders: [{test: /\.js$/, loader: 'babel-loader', options: babelOptions}]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'react-mobx-admin.min.js'
    },
    externals: {
      'mobx': {root: 'mobx', commonjs2: 'mobx', commonjs: 'mobx'}
    }
  }
}
