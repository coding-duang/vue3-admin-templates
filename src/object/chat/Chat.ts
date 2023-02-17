import { Emitter } from '../Emitter'
import { User } from '../user'
import { ChatEvents } from '@/enum'
import { ChatListItem } from '@/types'

export class ChatSession extends Emitter<ChatEvents> {
  private chatList: ChatListItem[] = []

  constructor(private from: User, private to: User) {
    super()
  }

  public getChatList() {}

  public send(chatItem: ChatListItem) {
    this.chatList.push({
      chatEventType: 'send',
      ...chatItem,
    })
    this.emit(ChatEvents.SEND)
  }

  public recieve(chatItem: ChatListItem) {
    this.chatList.push({
      chatEventType: 'recieve',
      ...chatItem,
    })
    this.emit(ChatEvents.RECIEVE)
  }
}
