/**
 * 拷贝模块
 */
const path = require('path');
const copydir = require('copy-dir');
const fs = require('fs');
const viewPath = path.join(process.cwd(), 'dist');
const secondDir = '/otherWeb';

process.on('message', function({ env }) {
  done(env);
});

function done(env) {
  getStat(viewPath).then(async (res) => {
    delDir(path.join(process.cwd(), '../serve/app/public' + secondDir));
    delDir(path.join(process.cwd(), '../serve/app/view' + secondDir));
    if (!fs.existsSync(path.join(process.cwd(), '../serve/app/view/'))) {
      fs.mkdirSync(path.join(process.cwd(), '../serve/app/view/'));
    }
    fs.mkdirSync(
      path.join(process.cwd(), '../serve/app/view' + secondDir)
    );

    /**********复制index.html至serve/app/view**********/
    console.log('/********** 复制index.html至serve/app/view **********/', secondDir);
    await copydir.sync(
      './dist',
      './../serve/app/view' + secondDir,
      {
        filter: (stat, filePath, dirname) => {
          let fileName = path.basename(filePath);
          if (fileName === 'index.html' || fileName === 'dist') {
            return true;
          } else {
            return false;
          }
          // return true;
        },
      },
      function(err) {
        console.log(err);
      }
    );

    // if (env === 'test' || env === 'prod') {
    //   process.send('success');
    //   return;
    // }

    /**********复制静态资源至serve/app/public**********/
    console.log('/********** 复制静态资源至serve/app/public **********/', secondDir);

    await copydir.sync(
      './dist',
      './../serve/app/public' + secondDir,
      {
        filter: (stat, filePath, dirname) => {
          let fileName = path.basename(filePath);
          console.log('fileName', fileName)
          if (fileName !== 'index.html' || fileName === 'dist') {
            return true;
          } else {
            return false;
          }
        },
      },
      function(err) {
        console.log(err);
      }
    );
    process.send('success');
  });
}

/**
 * 判断指定目录是否存在
 * @param {*} path
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}
/**
 * 删除指定目录及其下的所有文件
 * @param {*} path
 */
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
