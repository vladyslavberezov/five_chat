import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AuthData, { IAuthData } from './AuthData'

export type TAPIRequestConfig = AxiosRequestConfig & { isPublic: true };

export interface IAPIService {
  authData: IAuthData;
  get: <T>(url: string, config: TAPIRequestConfig) => Promise<AxiosResponse<T>>
  post: <T>(url: string, data: unknown, config: TAPIRequestConfig) => Promise<AxiosResponse<T>>
  put: <T>(url: string, config: TAPIRequestConfig) => Promise<AxiosResponse<T>>
  delete: <T>(url: string, config: TAPIRequestConfig) => Promise<AxiosResponse<T>>
}

class APIService implements IAPIService {
  authData: IAuthData;

  private axiosInstance: AxiosInstance;

  constructor(options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
    })
    this.authData = new AuthData();

    this.axiosInstance.interceptors.request.use((config: TAPIRequestConfig) => {
      if (!config.isPublic) {
        if (this.authData.isEmpty()) {
          throw new Error('Not authenticated');
        }

        const { accessToken } = this.authData.get()
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    })
  }

  public get = async <T>(url: string, config: TAPIRequestConfig): Promise<AxiosResponse<T>> => {
    let response: AxiosResponse<T>
    try {
      response = await this.axiosInstance.get<T>(url, config)
    } catch (e) {
      console.error(e)
    }
    return response
  }

  public post = async <T>(url: string, data, config: TAPIRequestConfig) => {
    let response: AxiosResponse<T>
    try {
      response = await this.axiosInstance.post<T>(url, data, config )
    } catch (e) {
      console.error(e)
    }
    return response
  }

  public put = async <T>(url: string, config: TAPIRequestConfig) => {
    let response: AxiosResponse<T>
    try {
      response = await this.axiosInstance.put(url, config)

    } catch (e) {
      console.error(e)
    }
    return response
  }

  public delete = async <T> (url: string, config: TAPIRequestConfig) => {
    let response: AxiosResponse<T>
    try {
      response = await this.axiosInstance.delete(url, config)
    } catch (e) {
      console.error(e)
    }
    return response
  }
}

const apiService = new APIService({
  // baseURL: process.env.API_URL, // TODO: set the env // http://localhost:3001
  baseURL: 'http://localhost:3001',
})

export default apiService