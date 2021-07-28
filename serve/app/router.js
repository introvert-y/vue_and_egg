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
  router.get('/practice', controller.home.practice);
  router.get('/report', controller.home.report);
  router.get('/multilingual', controller.home.multilingual);
  /**
   * 通过设置cookie的方式来设置二级域名的路由，然后指向vue的router里引入baseUrl
   * 这里再挂上那个二级域名前缀
   */
  router.get('/rich_text/Api/getUrl', controller.home.getUrl);
  router.post('/rich_text/Api/xss', controller.home.getJs);
  router.post('/rich_text/Api/getContractPdf', controller.home.getContractPdf);
  router.get('/rich_text/*', controller.home.showVueProject);
};
