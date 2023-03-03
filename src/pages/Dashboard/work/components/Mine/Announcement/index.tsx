import { defineComponent } from 'vue'
import { NCard, NIcon, TagProps, NTag, NEllipsis } from 'naive-ui'
import { ChevronRightRound } from '@vicons/material'
import styles from './index.module.scss'

type AnnouncementDataType = {
  type: TagProps['type']
  content: string
  title: string
}

const announcementData: AnnouncementDataType[] = [
  {
    title: '紧急',
    type: 'error',
    content: '尊敬的客户：为了提供更好的服务质量，我们决定将客服热线改为全天24小时服务。如您有任何问题或疑问，请随时拨打我们的客服热线。'
  },
  {
    title: '通知',
    type: 'info',
    content: '温馨提示：春节将至，我们将在2月10日至2月20日放假，恢复正常工作时间为2月21日。在此期间，如有紧急情况，请联系我们的紧急联系人。祝您春节快乐！'
  },
  {
    title: '消息',
    type: 'primary',
    content: '通知：由于近期市场供应紧张，我们的产品价格将会上涨。感谢您一直以来对我们的支持，我们会尽力保证产品质量和服务质量。'
  },
  {
    title: '消息',
    type: 'success',
    content: '告知：为了加强企业文化建设，公司将于本周五举行年度员工聚餐活动。请各位员工准时到达指定地点参加活动。'
  },
  {
    title: '活动',
    type: 'warning',
    content: '通知：为了提高员工技能和业务水平，公司将于下周一至周五举办培训课程。请各位员工按时参加，并做好听课笔记。'
  }
]

export const Announcement = defineComponent({
  name: 'Announcement',
  setup() {
    return () => <div class={ styles.announcement }>
      <NCard title='公告' hoverable>
        {{
          'header-extra': () => <div class={ styles.more }>
            查看更多
            <NIcon size="20" component={ ChevronRightRound } />
          </div>,
          default: () => <div class={ styles.itemWrapper }>
            { announcementData.map(item => <div class={ styles.item }>
              <Tag class={ styles.tag } type={ item.type } size="small" content={ item.title }></Tag>
              <NEllipsis>{ item.content }</NEllipsis>
            </div>)}
          </div>
        }}
      </NCard>
    </div>
  }
})

const Tag = (props: TagProps & { content: string }) => <NTag bordered={ false } { ...props }>{ props.content }</NTag>
