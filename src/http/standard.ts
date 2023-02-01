import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { originName } from './config'

export type CustomResponse = {
  success?: boolean
  message?: string
  code: number
  data?: any
}

const stringifyResponse = (response: CustomResponse) => {
  const { code, message, data } = response
  const isSucc = code >= 200 && code < 300
  return {
    code,
    data,
    success: isSucc,
    message: message || '',
  }
}

export class Service {
  private _instance: AxiosInstance
  public static inst: Service

  static getInst () {
    if (!Service.inst) {
      Service.inst = new Service()
    }
    return Service.inst
  }

  constructor () {
    this._instance = axios.create({
      timeout: 10000,
      baseURL: originName,
    })
    this.useRequest(this._instance)
    this.useResponse(this._instance)
  }

  public requset (options: AxiosRequestConfig): Promise<CustomResponse> {
    return this._instance(options) as any as Promise<CustomResponse>
  }

  private useRequest (instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
      console.log(config)
      // TODO 临时使用的token
      config.headers.authorization = 'token'
      return config
    })
  }

  private useResponse (instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response: AxiosResponse<CustomResponse>) => {
        const res = response.data
        // console.log(res)
        return Promise.resolve(this.analysisResponse(res))
      },
      err => {
        console.log(err)
      }
    )
  }

  private analysisResponse (resp: CustomResponse) {
    if (resp.code >= 200 && resp.code < 300) {
      try {
        return resp
      } catch (err: any) {
        return {
          message: err.toString(),
          success: false,
          code: resp.code,
        }
      }
    } else if (resp.code >= 400 && resp.code < 500) {
      switch (resp.code) {
        case 401:
          // todo
          break
        case 403:
          // todo
          break
        case 404:
          // todo
          break
        default:
          break
      }
    } else {
      return stringifyResponse(resp)
    }
  }
}

export const fetchStandard = (options: AxiosRequestConfig) => Service.getInst().requset(options)
