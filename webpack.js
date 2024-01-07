const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports =
[
  {
    mode: "production",
    //performance: { hints: true },
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
      minimize: false
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery',
           "window.jQuery": "jquery",
           jquery: 'jquery'
       }),
     ],
    resolve: {
      alias: {
        "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
      },
      extensions: ['.vue', '.js', '.json'] // Assurez-vous d'inclure les extensions existantes
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
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
                      options: {
                        postcssOptions: {
                          plugins: () => [
                            require('autoprefixer')
                          ]
                        }
                      }
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