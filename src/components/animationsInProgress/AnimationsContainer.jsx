import React from 'react';
import {motion} from 'framer-motion';

import {useState, useEffect} from 'react';

import CandleAnim from './CandleAnim';
import CandleSpringAnimation from './CandleAnimSpring';

import FlowerAndCat from './FlowerAndCat';

import FishAndCat from './FishesAndCat/FishAndCat';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wrap: 'no-wrap',
    overflowY: 'scroll',
  }
}))

const items = [<CandleAnim />];

const AnimationsContainer = () => {

  const classes = useStyles();

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 8000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (<div className={classes.root}>{/**<CandleSpringAnimation key={counter}/>**/}<FishAndCat/></div>);
};


export default AnimationsContainer;