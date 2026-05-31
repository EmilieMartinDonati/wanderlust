import axios from 'axios'
import type { AppThunk } from '../store'
import type { User } from '../types'
import { URLS } from '../axios'

const USERS_PROPERTIES = new Set<keyof User>(['name', 'ratings'])

export const saveUserInformation = async (values: Partial<User>): Promise<{ result: unknown; error: unknown }> => {
  const finalUrl = URLS.users + '/update'
  const { data } = await axios.post(finalUrl, { payload: values })
  return data
}

export const saveUserFromAuth = (input: unknown): AppThunk => async (dispatch) => {
  const finalUrl       = URLS.users + '/retrieveOrCreate'
  const res            = await axios.post(finalUrl, { payload: input })
  const { user, error } = res.data as { user: User | null; error: unknown }

  if (user && !error) {
    dispatch({ type: 'CURRENT_USER_LOADED', currentUser: user })
    window.localStorage.setItem('currentUser', JSON.stringify(user))
  }
}

const getUserFillingRate = (user: User): number => {
  const filledProperties = Array.from(USERS_PROPERTIES).reduce((count, property) => {
    if (user[property] !== undefined && user[property] !== null) count += 1
    return count
  }, 0)
  return (filledProperties / USERS_PROPERTIES.size) * 100
}
