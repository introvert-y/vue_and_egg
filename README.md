
# vue_and_egg
vue+egg，api全部通过egg去反向代理，及打包后放到egg的目录

## 补充了多语言配置（服务端和客户端）
### serve端配置
serve端配置为plugin添加i18n
官方文档地址：https://eggjs.org/zh-cn/core/i18n.html#%E7%BC%96%E5%86%99-i18n-%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%96%87%E4%BB%B6
### 客户端配置
安装vue-i18n，在main里处理依赖文件，然后导入vue。还需要解决的问题是按需导入的情况
## rich_text 为vue项目
## 安装依赖
 npm install/cnpm install/ yarn
## 启动
  npm run serve
## 打包到egg 
  npm run build:test
## serve为egg项目
## 安装依赖
 npm install/cnpm install/ yarn
## 启动
  npm run dev
