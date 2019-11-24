module.exports = {
  entry: "./src/json-schema-model.js",
  output: {
    path: __dirname + "/dist",
    filename: 'json-schema-model.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  target: 'node',
  mode: 'production',
  externals: {
    "djv": "djv"
  },
  devtool: 'source-map'
};