const process = require('process');
const Config = require('webpack-chain');
const babelConfig = require('./babel.config');

const isDevelopment = process.env.NODE_ENV === 'development';
const config = new Config();

// output
config
  .mode(process.env.NODE_ENV)
  .devtool(isDevelopment ? 'module-source-map' : 'none')
  .output
  .globalObject('this');

// 添加loader
config
  .module
  // js
  .rule('js')
  .test(/^.*\.jsx?$/)
  .use('babel-loader')
  .loader('babel-loader')
  .options(babelConfig)
  .end()
  .exclude
  .add(/node_modules/)
  .end()
  .end()
  // image
  .rule('image')
  .test(/^.*\.(jpe?g|png|gif|webp|svg)$/)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 8192 * 2
  });

// externals
config
  .externals({
    react: 'window.React',
    'react-dom': 'window.ReactDOM'
  });

module.exports = config.toConfig();