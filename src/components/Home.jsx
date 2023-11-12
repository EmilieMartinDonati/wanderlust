import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import { getCurrentUser } from '../store';

import { _renderDaysInMonth } from '../actions/calendar';
import HandmadeCalendarContainer from './HandmadeCalendarContainer';
import { useAuth0 } from "@auth0/auth0-react";

import { createUseStyles } from 'react-jss';

import { saveUserFromAuth } from '../actions/users';

import { generateDataForTest } from '../actions/monitoring';

const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))
const Home = () => {

//   async function fetchPosts(){
//     const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')    
//     return data
// }

// const {data, error, isError, isLoading } = useQuery('posts', fetchPosts);

const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

const dispatch = useDispatch();

const currentUser = useSelector(getCurrentUser);

const classes = useStyles();


const _generateDataForTest = async () => {
  return await generateDataForTest(currentUser);
}

// if(isLoading){
//   return <div>Loading...</div>
// }
// if(isError){
//   return <div>Error! {error.message}</div>
// }

useEffect(() => {
  if (user) {
    dispatch(saveUserFromAuth(user));
  }
}, [user]);

const logUser = async () => {
  loginWithRedirect();
};
const logoutUser = () => {
   logout({ returnTo: window.location.origin });
}

return(
  <div className={classes.root}>
  <h1>Posts</h1>
  {!user && <button onClick={logUser}>Log In</button>}
  {!!user && <button onClick={logoutUser}>Log out</button>}
  <button onClick={_generateDataForTest}>Cliquer pour générer des faux bookings</button>
  <HandmadeCalendarContainer generateData={({selectedYear, selectedMonth}) => _renderDaysInMonth({selectedYear, selectedMonth})}/>
  </div>
)
}


export default Home;