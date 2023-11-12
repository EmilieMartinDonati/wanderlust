import axios from 'axios';

import { URLS } from '../axios';

const URL_LISTINGS = URLS.listings;

const CREATE_URL = URL_LISTINGS + "/create";

export const createNewListing = async ({ listingValues, user }) => {
  const userFromLs = window.localStorage.getItem('currentUser');
  const { data } = await axios.post(CREATE_URL, { listingOrListings: [listingValues], email: user.email || JSON.parse(userFromLs).email });
  return data;

}