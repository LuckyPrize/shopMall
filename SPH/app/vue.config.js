const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList',
        // pathRewrite: { '^/api': '' },
      },
    },
  }
})
