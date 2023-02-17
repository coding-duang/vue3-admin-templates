import { Component } from 'vue'
import { UserInfo } from './user'

export type ChatEventType = 'send' | 'recieve'

export type MessageContentType =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | 'file'
  | 'component'

export type ChatListItem = {
  chatEventType: ChatEventType
  contentType: MessageContentType
  time: string | number
  userinfo: UserInfo
  content: string | any
  // eslint-disable-next-line no-undef
  slots?: JSX.Element | Component | null
}
