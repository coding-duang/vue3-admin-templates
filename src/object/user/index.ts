import { UserInfo } from '@/types'

export class User {
  constructor(private user: UserInfo) {}

  public createChatSession(to: User) {}

  public getUserinfo(key: keyof UserInfo) {
    return this.user
  }
}
