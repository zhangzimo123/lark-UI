const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          // 'link-color': '#FFFFFF'
          'padding-lg': '12px',
          'padding-md': '8px',
          'padding-sm': '6px',
          'padding-xs': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        // target: 'http://10.12.97.30:7300/mock/5c7e346c4e202c2e806a149d/lark',
        target: 'https://www.easy-mock.com/mock/5cb52fb383745c2658d1c9a2/lark',
        // target: 'http://localhost:7300/mock/5c7f89e819c70b5181f60a0e/lark',
        // target: 'http://localhost:7300/mock/5c89c695a18a2c03a0a402b3/lark',
        ws: false,
        changeOrigin: true
      },
      '/gateway': {
        // target: 'https://www.easy-mock.com/mock/5b7bce071f130e5b7fe8cd7d/antd-pro',
        // target: 'http://10.12.97.30:7300/mock/5c7e346c4e202c2e806a149d/lark',
        target: 'https://www.easy-mock.com/mock/5cb52fb383745c2658d1c9a2/lark',
        // target: 'http://localhost:7300/mock/5c7f89e819c70b5181f60a0e/lark',
        // target: 'http://localhost:7300/mock/5c89c695a18a2c03a0a402b3/lark',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/gateway': '/api'
        }
      }
    }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
