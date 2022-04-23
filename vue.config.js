// let path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  devServer:{
    proxy:{
      '/api' : {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        // pathRewrite: { '^/api': '' },
      
      }
    }
  }
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src')) 
  // }
})