const webpack = require('webpack')
module.exports = {
	lintOnSave: false,
    devServer: {
		host: "0.0.0.0",
        port: 9066,
		open: true,
		proxy: {
		    '/api': {     //这里最好有一个 /
		        target: 'http://47.113.202.167:9090',  // 后台接口域名
		        ws: true,        //如果要代理 websockets，配置这个参数
		        secure: false,  // 如果是https接口，需要配置这个参数
		        changeOrigin: true,  //是否跨域
		        pathRewrite:{
		            '^/api':''
		        }
		    }
		},
		disableHostCheck: true
    },
}
