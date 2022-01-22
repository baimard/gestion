const path = require('path');
var webpack = require('webpack');

module.exports =
[
  {
    mode: "production",
    performance: { hints: false },
    entry: ['./src/js/client.js'
          ],
    output: {
      filename: '../js/client.app.js',
    },
    optimization: {
      minimize: false
    },
    module: {
        rules: [
            {
              test: /\.less$/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'less-loader',
                },
              ],
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'postcss-loader',
                    },
                    {
                      loader: 'sass-loader',
                    },
                ],
              },
              {
                test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
              },
          ],
      },
  },
  {
    mode: "production",
    performance: { hints: false },
    entry: ['./src/js/main.js', 
            './src/js/pdf.js'
          ],
    output: {
      filename: '../js/[name].app.js',
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
    ],
    module: {
        rules: [
            {
              test: /\.less$/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'less-loader',
                },
              ],
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'postcss-loader',
                    },
                    {
                      loader: 'sass-loader',
                    },
                ],
              },
              {
                test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
              },
          ],
      },
  },
];