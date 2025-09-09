const path = require('path');

module.exports = {
  // ...existing config...
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};