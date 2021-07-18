'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/Api/getUrl', controller.home.getUrl);
  // http://127.0.0.1:7001/practice
  // http://127.0.0.1:7001/practice#/editor
  router.get('/practice', controller.home.showVueProject);
};
