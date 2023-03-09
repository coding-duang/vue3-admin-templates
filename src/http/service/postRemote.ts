import { fetchStandard } from '../standard'

export class PostRemote {
  getSave(data: any) {
    return fetchStandard({ url: 'xxx', method: 'post', data })
  }
}
