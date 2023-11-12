import axios from "axios"

import { URLS } from "../axios";


const USERS_PROPERTIES = new Set(['name', "age", "skills", "language", "medias"]);

/** from user form */
export const saveUserInformation = async (values) => {
  let baseUrl = URLS.users;
  const finalUrl = baseUrl + "/update"; /** it's actually an update but it would do the trick here I guess */
  let { result, error } = await axios.post(finalUrl, { payload: values });
  return { result, error };
}

/** from login */
export const saveUserFromAuth =  (input) => {
  return async (dispatch) => {
    let baseUrl = URLS.users;
    const finalUrl = baseUrl + "/retrieveOrCreate";
    let res = await axios.post(finalUrl, {payload: input});
    const {user, error} = res.data;
    console.log('IN ACTION', user, error);
    if (error) {
      // do a snackbar
    }
    if (user && !error) {
     dispatch({
      type: "CURRENT_USER_LOADED",
      currentUser: user,
     })
     const localStorage = window.localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}

// function to define if the user has completed is profile

const getUserFillingRate = (user) => {
  const filledProperties = USERS_PROPERTIES.reduce((count, property) => {
    if (user[property]) count += 1;
    return count;
  }, 0)
  return (filledProperties / USERS_PROPERTIES) * 100
}


