

import { createUseStyles } from "react-jss";

import { motion, useAnimate, useAnimation } from "framer-motion";

import { useEffect, useState } from "react";

import { delay } from "../../../actions/utils";


const useStyles = createUseStyles(() => ({
  root: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 700,
  },
  fullFish: {
    width: ({ size }) => size === 'medium' ? 100 : 80,
    height: ({ size }) => size === 'medium' ? 30 : 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fishBody: {
    borderRadius: "50%",
    width: 80,
    height: 50,
    backgroundColor: 'orange',
    position: "relative",
  },
  fishEye: {
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    top: 15,
    height: 15,
    width: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishIris: {
    borderRadius: '50%',
    backgroundColor: 'black',
    height: '50%',
    width: '50%'
  },
  fin: {
    display: 'flex',
    flexDirection: 'column',
  },
  finTop: {
    backgroundColor: "orange",
    borderRadius: "50%",
    transform: "rotate(20deg)",
    width: "40px",
    height: "20px",
    marginRight: -10,
  },
  finBottom: {
    backgroundColor: "orange",
    borderRadius: "50%",
    transform: "rotate(-20deg)",
    width: "40px",
    height: "20px",
    marginRight: -10,
  }
}))

const OneFish = ({ delay, size, rootClassName = '', bewildermentBeginning = 7 }) => {

  const classes = useStyles({ size });

  const [scope, animate] = useAnimate();


  useEffect(() => {
    const aquariumElement = document.getElementById('aquarium') || {};
    const { offsetWidth, offsetLeft, offsetHeight } = aquariumElement;
    const maxLeftPosition = (offsetWidth || 348) - 110;
    const maxBottomPosition = (offsetHeight || 270) - 110; // - fish HEIGHT since he has rotated

    async function myAnimation() {
        await animate(scope.current, { left: [10, maxLeftPosition, offsetLeft, maxLeftPosition, 10] }, { duration: 4, ease: "easeInOut" });
        await animate(scope.current, { top: [20, maxBottomPosition] }, { duration: 1, ease: "easeInOut" });
        await animate(scope.current, { left: [10, maxLeftPosition, offsetLeft] }, { duration: 2, ease: "easeInOut" });
        await animate(scope.current, { top: [maxBottomPosition, 30] }, { duration: 2, ease: "easeInOut" });

        /** we wait a bit for the animation on the eye to trigger */
        await animate(scope.current, {rotate: 90}, {duration: 0.5, ease: 'easeIn', delay: 3})
        await animate(scope.current, { top: [30, maxBottomPosition]}, { duration: 0.5, ease: "easeInOut" });
        await animate(scope.current, {rotate: [90, 0]}, {duration: 0.5});
        await animate(scope.current, { left: [10, maxLeftPosition, offsetLeft, maxLeftPosition, 10, maxLeftPosition, 10, maxLeftPosition, 10] }, { duration: 4, ease: "easeInOut", repeat: 2 });


      /** la muerte del poisson */
      }

    myAnimation();

  }, []);

  return (
    <motion.div className={classes.root} ref={scope}>
      <div className={classes.fullFish}>
        <div className={classes.fin}>
          <div className={classes.finTop} />
          <div className={classes.finBottom} />
        </div>
        <motion.div className={classes.fishBody}>
          <FishEye classes={classes} bewildermentBeginning={bewildermentBeginning} />
        </motion.div>
      </div>
    </motion.div>
  )
}


export default OneFish;


const FishEye = ({ bewildermentBeginning = 9, classes = '' }) => {

  const [scope, animate] = useAnimate();

  useEffect(() => {
    async function triggerAnimation() {
      await animate(scope.current, {justifyContent: "end"}, { duration: 0.1, ease: "easeInOut" });
      await animate(scope.current, { width: [20, 40, 20], height: [20, 40, 20], top: [15, 0, 15]}, { duration: 0.5, ease: "easeInOut" });
    }
    const timeoutForAnimation = setTimeout(() => {triggerAnimation()}, bewildermentBeginning * 1000);
    return () => {
      clearTimeout(timeoutForAnimation);
    }
  }, []);

  return (<motion.div className={classes.fishEye} ref={scope}>
    <motion.div className={classes.fishIris}></motion.div>
  </motion.div>)
}