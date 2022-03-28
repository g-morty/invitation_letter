const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   historyApiFallback: true,
  //   disableHostCheck: true,
  // }
})


// module.exports = {
//     pages:{
//         index: {
//             entry:'src/main.js'
//         }
//     },
//     lintOnSave: false,
//     productionSourceMap: false,
//     devServer: {
//       historyApiFallback: true,
//       watchOptions: { aggregateTimeout: 300, poll: 1000 },
//       disableHostCheck: true,
//     }
// }