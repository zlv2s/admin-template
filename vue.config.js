const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: '/',

  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  // 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',

  // 开发环境使用 eslint-loader
  lintOnSave: process.env.NODE_ENV === 'development',

  // 打包时不生成.map文件
  productionSourceMap: false,

  // 跨域配置代理服务器
  devServer: {
    // 出现编译错误时。浏览器全屏显示
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://www.shuiyue.info:12300',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },

  // 文件夹配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@utils': resolve('src/utils'),
        '@styles': resolve('src/styles'),
        '@com': resolve('src/components'),
        '@views': resolve('src/views'),
        '@assets': resolve('src/assets'),
        '@config': resolve('src/config')
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // 在 sass-loader v8 中，这个选项名是 "prependData"
        prependData: '@import "~@styles/index.scss";'
      }
    }
  }
}
