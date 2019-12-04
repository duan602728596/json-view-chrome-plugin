const process = require('process');
const postcssModules = require('postcss-modules');

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const postcssConfig = [
  postcssModules({
    generateScopedName: isDevelopment ? '[path][name]__[local]___[hash:base64:6]' : '_[hash:base64:6]'
  })
];

module.exports = postcssConfig;