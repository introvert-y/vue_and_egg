const webpack = require('webpack')
const path = require('path')
const child_process = require('child_process');
const { BUILD_ENV } = process.env;

let serDomain = 'http://localhost:8080/';

const secondDir = '/otherWeb';
// const build_version = new Date().getTime();

if (BUILD_ENV === 'test' || BUILD_ENV === 'prod') {
  serDomain = 'http://localhost:7001/public' + secondDir;
}
//获取本机ip地址
function getIPAdress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

const ip = getIPAdress();
console.log('ip', ip)
module.exports = {
  publicPath: serDomain,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/Api': {
        target: `http://${ip}:7001/`,
        ws: true,
        changeOrigin: true,
      },
    },
    // historyApiFallback: true,
  },
  chainWebpack: (config)=>{
		config.resolve.alias
				.set('@utils', path.join(__dirname, './src/utils'))
				.set('@requset', path.join(__dirname, './src/requset'))
				.set('@components', path.join(__dirname, './src/components'))
	},
  configureWebpack: (config) => {
    if (BUILD_ENV && BUILD_ENV != 'dev') {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('MyPlugin', (compilation) => {
            // do something when webpack compilation done
            // let child = child_process.fork('./build/postcdn.js');
            // child &&
            //   child.on('message', (m) => {
            //     if (m === 'success') {
            //       child.kill('SIGHUP');
            //     }
            //   });
            // child.send({
            //   build_version,
            //   build_env: BUILD_ENV,
            // });
            let child1 = child_process.fork('./build/copydir.js');
            child1 &&
              child1.on('message', (m) => {
                if (m === 'success') {
                  child1.kill('SIGHUP');
                }
              });
            child1.send({
              env: BUILD_ENV,
            });
          });
        },
      });
      config.plugins.push(new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }));
      config.plugins = [...config.plugins /* , ...sen_plu */];
      config.devtool = 'source-map';
    }
  }
};