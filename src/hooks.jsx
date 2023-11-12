/** axios */

import {useState, useEffect, useRef} from 'react';
import axios from "axios";

export const useAxiosPost = (url, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          url,
          payload
        );

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { data, error, loaded };
};

/**
 * 
 * @param {*} value 
 * @param {*} milliSeconds 
 */

export const useDebounce = (valueOrFn, milliSeconds = 1000) => {
 const [debouncedValueOrFn, setDebouncedValueOrFn] = useState(valueOrFn);

 useEffect(() => {
  const mytimeout = () => {
    setTimeout(() => {
     setDebouncedValueOrFn(valueOrFn);
    }, [milliSeconds])
  }
  return () => {
    clearTimeout(mytimeout);
  }
 }, 
 [valueOrFn, milliSeconds]);

 return debouncedValueOrFn;
}