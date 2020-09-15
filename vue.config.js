

const path = require("path");
// const HtmlWebpackplugin = require("html-webpack-plugin")
const utils = {
  assetsPath: function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      // 生产环境下的 static 路径
      ? 'static'
      // 开发环境下的 static 路径
      : 'static'

    return path.posix.join(assetsSubDirectory, _path)
  },
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: {

    performance: {
      hints: false
    },
    // plugins: [
    //   new HtmlWebpackplugin()
    // ],
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    },
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: utils.assetsPath('fonrs/[name].[hash:7].[ext]')
          }
        },
        // {
        //   test: /\.html$/,
        //   loader: "html-loader",
        // }
        // {
        //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10240,
        //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
        //   }
        // },
      ]
    },
  },
  // chainWebpack: config => {
  //   // 压缩图片
  //   const imagesRule = config.module.rule('images')
  //   imagesRule.uses.clear()
  //   imagesRule.use('file-loader')
  //     .loader('url-loader')
  //     .options({
  //       limit: 10240,
  //       fallback: {
  //         loader: 'file-loader',
  //         options: {
  //           outputPath: 'static/images'
  //         }
  //       }
  //     })


  // },
  devServer: {
    host: 'jammusic.art',
    port: 8080,
    proxy: {
      "/mustard": {
        target: "http://47.111.244.224/mustard",
        changeOrigin: true,
        pathRewrite: { '^/mustard': '' }
      },
      "/access_token": {
        target: "https://api.weixin.qq.com/sns/oauth2/access_token",
        changeOrigin: true,
        pathRewrite: { '^/access_token': '' }

      }
    }
  },

}


