module.exports = {
  publicPath: "./",
  outputDir: "dist",
  // 去除.map文件
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xxx:20101/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // host: "localhost",
    open: true,
    port: 8089
  },
  configureWebpack: () => ({
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest"
          },
        }
      }
    }
  }),
}