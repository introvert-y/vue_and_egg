'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getUrl() {
    const { ctx } = this;
    console.log('触发了getUrl >>>>>>>>>>>>')
    return ctx.body = {
      code: 0,
      data: {
        url: 'www.baidu.com',
      },
      message:'',
    };
  }
  async showVueProject() {
    const { ctx } = this;
    console.log(ctx.request)
    const data = {
      baseUrl: this.config.domainPublicPath,
    }
    console.log('>>>>>>>>>>>>>>>>>>')
    console.log('showVueProject')
    await ctx.render("/otherWeb/index.html", data);
  }
}

module.exports = HomeController;
