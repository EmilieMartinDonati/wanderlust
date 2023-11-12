import axios from 'axios';

import { URLS } from '../axios';

const URL_PROPERTIES = URLS.properties;

const CREATE_URL = URL_PROPERTIES + "/create";

export const createProperties = async ({properties, user}) => {
  const userFromLs = window.localStorage.getItem('currentUser');
  const { data } = await axios.post(CREATE_URL, { propertyOrProperties: properties, email: user.email|| JSON.parse(userFromLs).email });
  return data;
}