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
  router.get('/Api/getUrl', controller.home.getUrl);
  // // http://127.0.0.1:7001/practice
  // // http://127.0.0.1:7001/practice#/editor
  router.get('/template', controller.home.showVueProject);
  router.get('/editor', controller.home.showVueProject);
};
