module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  target: 'webworker',
  mode: 'development',
  resolve: {
    aliasFields: [],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
