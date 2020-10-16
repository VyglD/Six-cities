const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        open: false,
        port: 1338,
        historyApiFallback: true,
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
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new MomentLocalesPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
};
