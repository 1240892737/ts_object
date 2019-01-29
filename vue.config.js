// console.log(process.env)
module.exports = {
  lintOnSave: false,
  assetsDir: "static",
  devServer: {
      port: 8000,
      proxy: {
          '/apis': {
              target: 'http://localhost:3000/',  // target host
              ws: true,  // proxy websockets 
              changeOrigin: true,  // needed for virtual hosted sites
              pathRewrite: {
                  '^/apis': ''  // rewrite path
              }
          }
      }
  },
};
