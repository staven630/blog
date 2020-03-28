```js
import router from '@router';
import store from '@store';
import AxiosInstance from 'axios';
import { Loading, Message } from 'element-ui';

import { AUTH_ERRORS, ERRORS } from '../utils/errors';

const qs = require("qs");

let loadingInstance = null;

const showLoading = () => {
  loadingInstance = Loading.service({ fullscreen: true });
};

const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
};

const handlerError = error => {
  if (ERRORS[error.code]) {
    return Message({
      message: error.message,
      type: "error",
      center: true,
      onClose: () => { }
    });
  }

  if (AUTH_ERRORS[error.code]) {
    router.replace("login");
    return;
  }
};

// token拦截器
const tokenInterceptor = config => {
  const token = store.getters["auth/token"];
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
};

// 格式化参数拦截器
const paramsInterceptor = config => {
  config.paramsSerializer = params => {
    return qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false
    });
  };
  return config;
};

// 显示loading拦截器
const loadingInterceptor = config => {
  showLoading();
  return config;
};

// 正在pending中的请求
const pending = {};
const CancelToken = axios.CancelToken;
const removePending = (config, cb) => {
  // 确保请求和相应的url相同
  const url = config.url.replace(config.baseURL, "/");
  // 使用URL参数将整个RESTful请求字符串化
  const flagUrl = `${url}&${config.method}&${JSON.stringify(config.params)}`;

  if (flagUrl in pending) {
    if (typeof cb === "function") {
      cb();
    } else {
      delete pending[flagUrl];
    }
  } else {
    if (typeof cb === "function") {
      pending[flagUrl] = cb;
    }
  }
};

// cancelToken拦截器
const cancelTokenInterceptor = config => {
  config.cancelToken = new CancelToken(c => {
    removePending(config, c);
  });
  return config;
};

const createInstance = (
  options = { showLoading: false, hideLoading: true },
  config = {}
) => {
  // 默认配置
  const defaultConfig = {
    baseURL: process.env.VUE_APP_BASE_URL || "/",
    timeout: 30000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      Accept: "application/json",
      "Content-Type": "application/json"
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      // post: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // }
    },
    ...config
  };

  const httpClient = AxiosInstance.create(defaultConfig);
  httpClient.interceptors.request.use(cancelTokenInterceptor);
  httpClient.interceptors.request.use(tokenInterceptor);
  httpClient.interceptors.request.use(paramsInterceptor);

  if (options.showLoading) {
    httpClient.interceptors.request.use(loadingInterceptor);
  }

  httpClient.interceptors.response.use(
    res => {
      if (res.config.responseType === "blob" && res.data) {
        return res.data;
      }
      if (options.hideLoading) {
        hideLoading();
      }
      if (!res.data) return res;
      // if (+res.data.code !== 200) {
      //   handlerError(res.data);
      //   return Promise.reject(res.data);
      // }
      return res.data.data ? res.data.data : res.data;
    },
    err => {
      removePending(err.config);

      if (!AxiosInstance.isCancel(err)) {
        return Promise.reject(err);
      }

      if (options.hideLoading) {
        hideLoading();
      }

      // if (err.message.includes("timeout")) {
      //   handlerError({ code: 0 });
      //   return Promise.reject({ code: 0 });
      // }

      let { status, statusText, data, headers, request } = err.response;
      handlerError(data);
      return Promise.reject(err.response);
    }
  );

  httpClient.clear = () => {
    Object.keys(pending).map(e => {
      if (typeof pending[e] === "function") {
        pending[e]();
        delete pending[e];
      }
    });
  };

  return httpClient;
};

export const axios = createInstance();
export const axiosLoading = createInstance({
  showLoading: true,
  hideLoading: true
});
export const getAxios = createInstance;
export default axios;
```