module.exports = {
  devServer: {
    disableHostCheck: true
  },

  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  transpileDependencies: ['vuetify']
}
