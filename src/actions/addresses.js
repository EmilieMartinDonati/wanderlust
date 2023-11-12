import axios from 'axios';

import { URLS } from '../axios';

const URL_ADDRESSES = URLS.addresses;

export const fetchUserAddresses = async () => {
  console.log('whereeee fetch');
  const URL = URL_ADDRESSES + "/findAll";
  const data = await axios.get(URL);
  return data?.data;
}

export const validateAddress = async ({ values }) => {
  console.log('whereeee verify');
  // const URL = URL_ADDRESSES + "/verify";
  // let res = await axios.post(URL, { payload: values });
  // return res.data; 
  // todo integrate google places api
  return true;
}

export const createNewAddress = async ({ values }) => {
  // console.log('whereeee create');
  // const URL = URL_ADDRESSES + "/create";
  // let res = await axios.post(URL, { payload: values });
}

export const getAddressAutoComplete = async ({ values }) => {
  console.log('whereeee autocompl');
  const URL = URL_ADDRESSES + "/autocomplete";
  let { result, error } = await axios.post(URL, { payload: values });
}


export const getFormCostumizedErrorMessage = ({ errors }) => {
  
}