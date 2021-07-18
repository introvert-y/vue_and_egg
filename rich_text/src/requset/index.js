import axios from 'axios';
import { Loading, Message } from 'element-ui';
import { getCookie } from '@utils/index';

let loadingInstance = null;
let countRequest = 0;

function closeLoading() {
  // console.log('close', countRequest, loadingInstance)
  countRequest -= 1;
  if (countRequest === 0) {
    loadingInstance.close();
  }
}

function openLoading() {
  loadingInstance = Loading.service({
    text: 'Loading...',
    background: 'rgba(255, 255, 255, 0.7)',
    spinner: 'el-icon-loading',
  });
}

// const ignoreApi = [""];
const service = axios.create({
  timeout: 50000, // request timeout
  baseURL: getCookie('reqPrefix'),
  headers: {},
});

service.interceptors.request.use(
  (config) => {
    /* if (process.env.NODE_ENV !== "production") {
      config.url = config.url.replace(/http:.*:2222/, "http://0.0.0.0:7001");
    } */
    // Do something before request is sent
    // countRequest++;
    openLoading();
    return config;
  },
  (err) => {
    closeLoading();
    console.log('request err:*********', err);
    Message.error({
      showClose: true,
      message: err,
    });
    return Promise.reject(err);
  },
);

service.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error),
);

/**
 *
 *
 * @param {*} {
 *   url,
 *   method='get',
 *   isNeedLoading=true, //是否开启loading
 *   isNeedToken=true, //默认需要token参数
 *   loadingText='加载中..',
 *   isShowCatchErr=true,//默认显示catch错误异常
 *   ...option
 * }
 * @returns
 */
async function request({
  url = '',
  method = 'get',
  isNeedLoading = true,
  ...option
}) {
  const param = {
    url,
    method,
    ...option,
  };
  return new Promise((resolve) => {
    // 检测是否开启loading， 统计为0时才启动loading
    if (isNeedLoading) {
      countRequest += 1;
      openLoading();
    }
    service(param)
      .then(async (res) => {
        if (option.responseType != "blob" && res.data.code != 0 && res.data.code !== 'success') {
          console.log('response data  err:*********', res.data.message);
          Message.error({
            showClose: true,
            message: res.data.message,
          });
        }
        // 处理需要跳转登录的状态码 （for黑卡)
        resolve({
          res: res.data,
        });
        // console.log('!!!!!!!!$$$$$ gtgtgtgggggg', isNeedLoading, countRequest)
        // loading为0时才关闭loading
        if (isNeedLoading) closeLoading();
      })
      .catch(async (err) => {
        console.log(err, '---response err---');
        Message.error({
          showClose: true,
          message: err,
        });
        if (isNeedLoading) closeLoading();
      });
    // 增加接口监控
  }).catch((error) => Promise.reject(error));
}

export default request;
