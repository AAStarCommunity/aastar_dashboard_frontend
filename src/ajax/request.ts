import Message from "@/utils/message";
// import { cookies } from "next/headers";
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosPromise,
} from "axios";
// import { KEY } from "@/context/userContext";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface ResponseData {
  code: 200 | 400 | 500;
  message: string;
  data: any;
}
interface ApiResponse<T = any> extends AxiosResponse {
  code: number;
  message: string;
  data: T;
}

class HtttpRequest {
  // 合并配置项
  private mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig {
    return Object.assign({}, ...configs);
  }

  // 设置get请求别名
  public get(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<ApiResponse> {
    const newConfig = this.mergeConfig(config, {
      url,
      method: "GET",
      params,
    });
    return this.request(newConfig);
  }

  // 设置post请求别名
  public post(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<ApiResponse> {
    const newConfig = this.mergeConfig(config, { data, url, method: "POST" });
    return this.request(newConfig);
  }

  public put(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<ApiResponse> {
    const newConfig = this.mergeConfig(config, { url, data, method: "PUT" });
    return this.request(newConfig);
  }

  public delete(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<ApiResponse> {
    const newConfig = this.mergeConfig(config, {
      url,
      params,
      method: "DELETE",
    });
    return this.request(newConfig);
  }

  // 构建请求
  public request(config: AxiosRequestConfig): AxiosPromise<ApiResponse> {
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
    // const { getLocal } = useLocalStorage();
    // const userid = cookies().get(KEY);
    instance.interceptors.request.use(
      (config) => {
        config.headers.user_id = "dylan";
        config.baseURL = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
          ? process.env.NEXT_PUBLIC_BASE_URL
          : location.origin + "/" + process.env.NEXT_PUBLIC_BASE_URL;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // interface IAxiosData {
    //   data: any;
    //   message: string;
    //   code: number;
    // }

    // 拦截响应
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const {
          data: { code, message, data },
          status,
        } = response;
        if (status === 200 && code === 200) {
        } else {
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
