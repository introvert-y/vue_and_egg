'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  // config/plugin.js
  i18n: {
    enable: true,
    package: 'egg-i18n',
  },
  // sessionRedis: {
  //   enable: true,
  //   package: 'egg-session-redis'
  // },
  // redis: {
  //   enable: true,
  //   package: 'egg-redis'
  // },
};
