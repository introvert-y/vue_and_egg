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
  // sessionRedis: {
  //   enable: true,
  //   package: 'egg-session-redis'
  // },
  // redis: {
  //   enable: true,
  //   package: 'egg-redis'
  // },
};
