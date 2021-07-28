"use strict";

const Controller = require("egg").Controller;
const puppeteer = require("puppeteer");

class HomeController extends Controller {
  // 重定向后，code 为302  且response header里会存在location
  async index() {
    const { ctx } = this;
    // ctx.body = "hi, egg";
    ctx.redirect('/rich_text/')
  }
  async practice() {
    const { ctx } = this;
    console.log('ctx.query', ctx.query);
    
    // 反射性
    // ctx.body = '<script>alert("反射型 XSS 攻击")</script>';
    // html转义
    // ctx.body = ctx.helper.escape('<script>alert("反射型 XSS 攻击")</script>');
    
    // 触发dom型 `?name=1234<script>alert(1324)</script>`
    await ctx.render("/template/index.html", {
      // 存储型
      url: '"" onclick=alert(document.cookie)',
      // 存储型
      // href: ctx.helper.sjs(' javascript:alert(document.cookie)'),
      href: ctx.helper.sjs('www.baidu.com'),
    });
  }
  // 上报错误
  async report() {
    const { ctx } = this;
    console.log("*************** 上报错误 **********");
    const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=80d25f4f-dda6-4a66-8b08-79fba395f03b';
    const options = {
      dataType: 'json',
      timeout: 60000,
      method: "POST",
      data: JSON.stringify({
        // "msgtype": "markdown",
        // 'markdown': {
        //   'content': `实时新增用户反馈<font color="warning">132例</font>，请相关同事注意.
        //   >类型:<font color="comment">用户反馈</font>
        //   >普通用户反馈:<font color="comment">117例</font>
        //   >VIP用户反馈:<font color="comment">15例</font> 
        //   <font color="info">绿色</font>
        //   <font color="comment">灰色</font>
        //   <font color="warning">橙红色</font>
        //   ### 测试报错联调尝试${new Date().getTime()}
        //   [这是一个链接](http://work.weixin.qq.com/api/doc)
        //   `
        // }
          "msgtype": "news",
          "news": {
             "articles" : [
                 {
                     "title" : "中秋节礼品领取",
                     "description" : "今年中秋节公司有豪礼相送",
                     "url" : "www.qq.com",
                     "picurl" : "http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png"
                 }
              ]
          }
      
      })
    }
    let ret = await ctx.curl(url, options);
    return ctx.body = ret.res.data;
  }
  async multilingual() {
    const { ctx } = this;
    console.log("多语言 >>>>>>>>>>>>");
    return (ctx.body = {
      code: 0,
      data: {
        text: ctx.__('Welcome back, %s!', 'ming')
      },
    });
  }
  getUrl() {
      const { ctx } = this;
      console.log("触发了getUrl >>>>>>>>>>>>");
      return (ctx.body = {
        code: 0,
        data: {
          url: "www.baidu.com",
        },
        message: "",
      });
    }
  async showVueProject() {
    const { ctx } = this;
    console.log("showVueProject>>>>>>>>>>>");
    ctx.cookies.set("reqPrefix", "/rich_text", {
      httpOnly: false,
      signed: false,
    });

    await ctx.render("/otherWeb/index.html");
  }
  async getJs() {
    const { ctx } = this;
    console.log('getJs')
    return ctx.body = {
      code: 0,
      data: {
        template: ctx.helper.escape("javascript:alert('XSS')"),
        value: '"" onclick=alert(document.cookie)',
      }
    };
  }
  /**
   *
   * 生成pdf
   */
  async getContractPdf() {
    const { ctx } = this;
    const url = `http://localhost:7001/rich_text/template`;
    console.log("getContractPdf", url);
    let browser = null;
    // if (process.env.START_ENV === "prod" || process.env.START_ENV === "test") {
    //   browser = await puppeteer.launch({
    //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
    //     executablePath: "/usr/bin/chromium-browser",
    //   });
    // } else {
    //   browser = await puppeteer.launch();
    // }
    browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
      // waitUntil: "networkidle0",
    });
    ctx.body = await page.pdf({
      format: "a4",
      margin: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 30,
      },
    });
    await browser.close();
    return ctx.body;
  }
}

module.exports = HomeController;
