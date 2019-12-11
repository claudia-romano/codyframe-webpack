const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = { 
  entry: ['./src/index.js', './src/style.scss', './src/style-fallback.scss'],
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
                return loader.resourcePath.indexOf('style.') > -1
                  ? [
                    require('autoprefixer')
                  ]
                  : [
                    require('autoprefixer'),
                    require('postcss-css-variables'),
                    require('postcss-calc')
                  ];
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }
        ],
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