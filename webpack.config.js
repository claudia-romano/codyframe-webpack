const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = { 
  entry: ['./src/index.js', './src/style.scss'],
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { 
        test: /\.s[ac]ss$/i,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: 'assets/css/[name].css',
						}
          },
          {
						loader: 'extract-loader'
          },
          {
						loader: 'css-loader?-url'
					},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return require('autoprefixer');
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              implementation: require("sass")
            }
          }
        ],
      }, 
      {
        test: /\.s[ac]ss$/i,
        enforce: "pre",
        loader: 'import-glob-loader',
        options: {
          test: 'use'
        }
      }
    ]
  },
  plugins: [
    new MergeIntoSingleFilePlugin({
      files: {
        "frontend.js": [
          'node_modules/codyhouse-framework/main/assets/js/util.js',
          'src/assets/js/components/**/*.js',
        ]
      }
    }),
]
};