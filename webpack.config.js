const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        filename: 'eleicao.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
      minimize: true
    },
    watchOptions: {
      ignored: ['**/node_modules'],
    }
};
