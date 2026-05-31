import axios from 'axios'
import type { User } from '../types'
import { URLS } from '../axios'

const URL_LISTINGS = URLS.listings
const CREATE_URL   = URL_LISTINGS + '/create'

export const createNewListing = async ({
  listingValues,
  user,
}: {
  listingValues: unknown
  user: Partial<User> & { email?: string }
}): Promise<unknown> => {
  const userFromLs = window.localStorage.getItem('currentUser')
  const { data }   = await axios.post(CREATE_URL, {
    listingOrListings: [listingValues],
    email: user.email || (userFromLs ? JSON.parse(userFromLs).email : undefined),
  })
  return data
}
