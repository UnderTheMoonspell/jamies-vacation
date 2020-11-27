import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'config';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

class Api {
  protected readonly instance: AxiosInstance;

  public constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);

  public get = (url: string, config?: AxiosRequestConfig) : Promise<AxiosResponse<any>> => {
    return this.instance.get(url, config);
  }

  public post = (url:string, payload: object) : Promise<AxiosResponse<any>> => {
    return this.instance.post(url, payload);
  }

}

export const weatherAPI = new Api(Config.weatherBaseUrl)
export const kiwiAPI = new Api(Config.kiwiBaseURL)