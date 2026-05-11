export type UserRole = 'owner' | 'traveller'

export type User = {
  email: string,
  id: string
  role: UserRole
  name: string
  ratings: number
  numberOfRatings: number
  homes?: string[]
  isHost?: boolean
  CCLevel?: number
}
