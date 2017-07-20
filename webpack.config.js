module.exports = (webpackConfig)=> {
  let retVal = Object.assign({}, webpackConfig, {
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      // 提出ant design的公共资源
      'antd': 'antd',
    },
    devServer: {
      hot: true,
      inline: true,
      port: 9000,
      stats: {colors: true, progress: false},
      compress: true,
      quiet: false,
      clientLogLevel: 'info',
      open: false,
      proxy: {
        '/api-alibi/api': {
          changeOrigin: true,
          target: 'http://localhost:3000',
          secure: false
        },
        '/api-cms': {
          changeOrigin: true,
          target: 'http://localhost:3000',
          secure: false
        }
      }
    }
  });
  return retVal;
};
