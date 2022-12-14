import axios from 'axios'
import AuthData from './AuthData'

class APIService {
  authData

  axiosInstance

  constructor(options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
    })
    this.authData = new AuthData()

    this.axiosInstance.interceptors.request.use((config) => {
      console.log('config.isPublic', config.isPublic)
      if (!config.isPublic) {
        console.log(' isEmpty', this.authData.isEmpty())
        console.log(' get', this.authData.get())

        if (this.authData.isEmpty()) {
          // throw an exception
        }

        const { accessToken } = this.authData.get()
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    })
  }

  get = async (url, config) => {
    let response
    try {
      response = await this.axiosInstance.get(url, config)
    } catch (e) {
      console.error(e)
    }
    return response
  }

  post = async (url, config) => {
    let response
    try {
      response = await this.axiosInstance.post(url, config)
    } catch (e) {
      console.error(e)
    }
    return response
  }

  put = async (url, config) => {
    let response
    try {
      response = await this.axiosInstance.put(url, config)

    } catch (e) {
      console.error(e)
    }
    return response
  }

  delete = async (url, config) => {
    let response
    try {
      response = await this.axiosInstance.delete(url, config)
    } catch (e) {
      console.error(e)
    }
    return response
  }
}

console.log('getAPIServiceInstance init')
const apiService = new APIService({
  // baseURL: process.env.API_URL, // TODO: set the env // http://localhost:3001
  baseURL: 'http://localhost:3001',
})

export default apiService