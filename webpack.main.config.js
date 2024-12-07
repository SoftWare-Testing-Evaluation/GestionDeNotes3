//webpack.main.config.js
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  devServer: {
    historyApiFallback: true, // This tells the dev server to serve index.html for all 404s
  },
};
