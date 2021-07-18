'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const historyApiFallback = app.middleware.historyApiFallback({
  //   app,
  // });
  router.get('/', controller.home.index);
  /**
   * 通过设置cookie的方式来设置二级域名的路由，然后指向vue的router里引入baseUrl
   * 这里再挂上那个二级域名前缀
   */
  router.get('/rich_text/Api/getUrl', controller.home.getUrl);
  router.get('/rich_text/*', controller.home.showVueProject);
};
