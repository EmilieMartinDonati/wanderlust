import axios from 'axios'
import { URLS } from '../axios'

const URL_ADDRESSES = URLS.addresses

export const fetchUserAddresses = async (): Promise<unknown> => {
  const URL = URL_ADDRESSES + "/findAll"
  const data = await axios.get(URL)
  return data?.data
}

export const validateAddress = async ({ values }: { values: unknown }): Promise<boolean> => {
  // TODO: integrate google places api
  return true
}

export const createNewAddress = async ({ values }: { values: unknown }): Promise<void> => {
  // const URL = URL_ADDRESSES + "/create"
  // await axios.post(URL, { payload: values })
}

export const getAddressAutoComplete = async ({ values }: { values: unknown }): Promise<void> => {
  const URL = URL_ADDRESSES + "/autocomplete"
  await axios.post(URL, { payload: values })
}

export const getFormCostumizedErrorMessage = ({ errors }: { errors: Record<string, string> }): void => {
}
