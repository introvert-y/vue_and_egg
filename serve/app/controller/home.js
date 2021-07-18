"use strict";

const Controller = require("egg").Controller;
const puppeteer = require("puppeteer");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async getUrl() {
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
