// vue.config.js
module.exports = {
  // 基本路径
  publicPath: './',
  // 构建时的输出目录
  outputDir: 'dist',
  // 放置静态资源的目录
  assetsDir: 'static',
  // index.html 的输出路径
  indexPath: 'index.html',
  // 文件名哈希
  filenameHashing: true,
  // 是否在保存的时候使用 `eslint-loader` 进行检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 9529,
    https: false,
    hotOnly: false,
    proxy: {}, // string | Object
    // eslint-disable-next-line no-unused-vars
    before: app => {}
  }
}
