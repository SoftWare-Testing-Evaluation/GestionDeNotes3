//webpack.renderer.config.js
const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      },
    },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  devServer: {  
    headers: {  
      "Content-Security-Policy": "default-src 'self' http://localhost:8080; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.lordicon.com; connect-src 'self' http://localhost:8080; style-src 'self' 'unsafe-inline';",  
    },  
    historyApiFallback: true,
    hot: true, // Active le Hot Module Replacement    
  },  
};