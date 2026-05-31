import axios from 'axios'
import type { User } from '../types'
import { URLS } from '../axios'

const CREATE_URL = URLS.properties + '/create'

export const createProperties = async ({
  properties,
  user,
}: {
  properties: unknown[]
  user: Partial<User> & { email?: string }
}): Promise<unknown> => {
  const userFromLs = window.localStorage.getItem('currentUser')
  const { data }   = await axios.post(CREATE_URL, {
    propertyOrProperties: properties,
    email: user.email || (userFromLs ? JSON.parse(userFromLs).email : undefined),
  })
  return data
}
