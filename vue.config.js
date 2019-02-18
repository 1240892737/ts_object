// console.log(process.env)
module.exports = {
  lintOnSave: false,
  assetsDir: "static",
  devServer: {
      port: 8000,
	  open: true,
      proxy: {
          '/apis': {
			  // target:'https://www.hzyza520.top:8080/',  //服务器地址
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
