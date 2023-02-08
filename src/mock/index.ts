import Mock, { MockjsRequestOptions, Random } from 'mockjs'
import { CodeEnum } from '@/enum'

const getQuery = (url: string, name: string) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')

    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')

      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}

const response = (data: any = null, success: boolean = true) => ({
  code: success ? CodeEnum.SUCCESS : CodeEnum.FAILED,
  success,
  message: '',
  data,
})

const tableData = Mock.mock({
  'list|20-60': [
    {
      id: '@increment(1)',
      title: '@ctitle',
      avatar: Random.image('200x200', '@color'),
      content: '@cparagraph',
      status: '@integer(0, 3)',
      open: '@boolean',
      add_time: '@date(yyyy-MM-dd hh:mm:ss)',
    },
  ],
})

Mock.setup({ timeout: '500-1000' })

Mock.mock(/\/api\/table/, 'get', (options: MockjsRequestOptions) => {
  const { url } = options

  const page = parseInt(getQuery(url, 'page'))
  const pageSize = parseInt(getQuery(url, 'pageSize'))
  const start = (page - 1) * pageSize
  const end = page * pageSize

  const totalPage = Math.ceil(tableData.list.length / pageSize)
  const list = page > totalPage ? [] : tableData.list.slice(start, end)

  return response({ list, total: tableData.list.length })
})
