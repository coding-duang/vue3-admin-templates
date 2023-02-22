import axios from 'axios'
const instance = axios.create()
instance.defaults.baseURL = 'http://127.0.0.1:8888'
instance.defaults.headers['Content-Type'] = 'multipart/form-data'
instance.interceptors.response.use(response => {
  return response.data
})

type AlreadyResponse = {
  code: number
  codeText: string
  fileList: Array<string>
}

export const getAlreadyAPI = (params: { HASH: string }) => {
  return instance<any, AlreadyResponse>({
    method: 'get',
    url: '/upload_already',
    params,
  })
}

type UploadChunkResponse = {
  code: number
  codeText: string
  originalFilename: string
  servicePath: string
}

export const uploadChunkAPI = (data: FormData) => {
  return instance<any, UploadChunkResponse>({
    method: 'post',
    url: '/upload_chunk',
    data,
  })
}

export const uploadMergeAPI = (data: string) => {
  return instance<any, UploadChunkResponse>({
    method: 'post',
    url: '/upload_merge',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
