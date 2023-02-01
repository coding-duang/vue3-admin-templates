import { fetchStandard } from '../standard'

export class PostRemote {
  getSave (data) {
    return fetchStandard({ url: 'xxx', method: 'post', data })
  }
}
