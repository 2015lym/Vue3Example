import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosInstanceClass {
  private readonly instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 设置拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在请求发送之前做一些处理，例如添加 token
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => {
        // 在响应成功之前做一些处理
        return response;
      },
      (error) => Promise.reject(error),
    );
  }

  public async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }

  public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }

  public async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put<T, R>(url, data, config);
  }

  public async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete<T, R>(url, config);
  }

  public async request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.instance.request<T, R>(config);
  }
}

const axiosInstance = new AxiosInstanceClass({
  // 设置基础 URL，这样在请求时就可以省略域名部分
  baseURL: 'https://jsonplaceholder.typicode.com/',
  // 设置超时时间
  timeout: 10000,
});

export default axiosInstance;