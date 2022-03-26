module.exports = {
  publicPath: './',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          th_color: '#0054fe'
        }
      }
    }
  }
}
