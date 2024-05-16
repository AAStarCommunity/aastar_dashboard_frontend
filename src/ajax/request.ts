import Message from "@/utils/message";
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosPromise,
} from "axios";
import { KEY } from "@/context/userContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface ResponseData {
  code: 200 | 1 | -1;
  message: string;
  data: any;
}

class HtttpRequest {
  // 合并配置项
  private mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig {
    return Object.assign({}, ...configs);
  }

  // 设置get请求别名
  public get(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    const newConfig = this.mergeConfig(config, {
      url,
      method: "GET",
    });
    return this.request(newConfig);
  }

  // 设置post请求别名
  public post(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    const newConfig = this.mergeConfig(config, { url, method: "POST" });
    return this.request(newConfig);
  }

  public put(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    const newConfig = this.mergeConfig(config, { url, method: "PUT" });
    return this.request(newConfig);
  }

  public detele(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    const newConfig = this.mergeConfig(config, { url, method: "DETELE" });
    return this.request(newConfig);
  }

  // 构建请求
  public request(config: AxiosRequestConfig): AxiosPromise {
    // 1.创建请求
    const instance: AxiosInstance = axios.create();
    // 2.添加拦截
    this.interceptor(instance);
    // 3.发送请求
    return instance(config);
  }

  // 添加拦截
  private interceptor(instance: AxiosInstance) {
    // 拦截请求
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getLocal } = useLocalStorage();
    const userid = getLocal(KEY)?.id;
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const userData = { user_id: userid };
        if (config.method == "get") {
          config.params = { ...config.params, ...userData };
        } else {
          config.data = { ...config.data, ...userData };
        }
        config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 拦截响应
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const {
          data: { code, message },
        } = response;
        if (code === 0) {
          //成功
        } else {
          // 失败
          Message({
            type: "danger",
            message,
          });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default HtttpRequest;
