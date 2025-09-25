const path = require('path');

module.exports = {
  // ...existing config...
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};