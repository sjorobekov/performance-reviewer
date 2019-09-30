const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'

const plugins = [
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true
    }
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new WebpackNotifierPlugin({ title: 'Webpack', contentImage: path.join(__dirname, 'ui/logo-webpack.png') }),
  // keep module.id stable when vender modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '/node_modules')
          ) === 0
      )
    }
  }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),
]

if (NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    sourceMap: true,
  }))

  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  plugins.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  )
}

module.exports = {
  context: `${__dirname}/ui`,
  entry: {
    app: './main.js',
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name].board.js',
    chunkFilename: '[id].board.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': `${__dirname}/ui`,
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        },
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: eslintFriendlyFormatter,
        },
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
        ),
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.styl(us)?$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader'],
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins,
  stats: 'minimal',
}
