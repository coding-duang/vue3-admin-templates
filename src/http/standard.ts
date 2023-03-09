import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { originName } from './config'
import { getToken } from '@/utils'

export type CustomResponse<R extends any> = {
  success?: boolean
  message?: string
  code: number
  data?: R
}

export class Service {
  private _instance: AxiosInstance
  public static inst: Service

  static getInst() {
    if (!Service.inst) {
      Service.inst = new Service()
    }
    return Service.inst
  }

  constructor() {
    this._instance = axios.create({
      timeout: 10000,
      baseURL: originName,
    })
    this.useRequest(this._instance)
    this.useResponse(this._instance)
  }

  public requset<T, R>(
    options: AxiosRequestConfig
  ): Promise<CustomResponse<R>> {
    return this._instance.request<T, CustomResponse<R>>({ ...options })
  }

  private useRequest(instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })
  }

  private useResponse(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const res = response.data
        return Promise.resolve(this.analysisResponse(res))
      },
      err => {
        console.log(err)
      }
    )
  }

  private analysisResponse(resp: any) {
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
      return Promise.reject(new Error(resp.message))
    }
  }
}

export const fetchStandard = <T, R>(options: AxiosRequestConfig) =>
  Service.getInst().requset<T, R>(options)
