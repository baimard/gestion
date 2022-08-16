const path = require('path');
var webpack = require('webpack');

module.exports =
[
  {
    mode: "production",
    performance: { hints: false },
    entry: {
      client: './src/js/client.js',
      devis: './src/js/devis.js',
      devisShow: './src/js/devisShow.js',
      facture: './src/js/facture.js',
      factureShow: './src/js/factureShow.js',
      produit: './src/js/produit.js',
      statistique: './src/js/statistique.js',
      legalnotice: './src/js/legalnotice.js',
      adminSection: './src/js/adminSection.js',
      configuration: './src/js/configuration.js',
      pdf: './src/js/pdf.js',
    },
    output: {
      filename: '../js/[name].app.js',
    },
    optimization: {
      minimize: true
    },
    plugins: [
      new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery',
           "window.jQuery": "jquery",
           jquery: 'jquery'
       }),
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