import { fetchStandard } from '../standard'

export class GetRemote {
  getKindList () {
    return fetchStandard({ url: 'xxx' })
  }
}
