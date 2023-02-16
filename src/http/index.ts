import { GetRemote } from './service/getRemote'
import { PostRemote } from './service/postRemote'

export * from './config'
export * from './standard'

export const getRemote = new GetRemote()
export const postRemote = new PostRemote()
