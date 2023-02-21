export type Role = 'admin' | 'user'
export type Sex = 'man' | 'woman' | 'unkown'

export type UserInfo = {
  avatar?: string
  username?: string
  role?: Role
  sex?: Sex
  userid?: number | string
}
