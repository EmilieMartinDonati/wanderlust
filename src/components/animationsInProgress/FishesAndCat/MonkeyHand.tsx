

import { createUseStyles } from 'react-jss';

import { motion } from 'framer-motion';

const useStyles = createUseStyles(() => ({
  handContainer: {
    display: 'flex',
    position: 'relative',
    width: '100px',
    height: '60px',
    justifyContent: 'center',
    alignItems: 'start',
    opacity: 0.6,
  },
  thumbContainer: {
    position: 'fixed',
    top: 'calc(50% - 10px)',
    right: 0,
    height: 15,
    width: 8,
    backgroundColor: 'saddlebrown',
  },
  finger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    border: '1px solid saddlebrown',
    backgroundColor: "peru",
    alignSelf: 'end',
    borderRadius: "40%",
    overflow: 'hidden',
    marginTop: 0,
    flex: 1,  /** works to make it takes the available space on x axis only */

  },
  jointsContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  joints: {
    backgroundColor: 'black',
    // width: 10,
    height: 2,
  },
  nailContainer: {
    height: '30%',
    width: '100%',
    borderRadius: '10%',
    backgroundColor: "saddlebrown",
  },
  fingerOne: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    border: '1px solid saddlebrown',
    backgroundColor: "peru",
    alignSelf: 'end',
    borderRadius: "40%",
    overflow: 'hidden',
    marginTop: 0,
    flex: 1,
    height: '80%',

  },
  fingerTwo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    border: '1px solid saddlebrown',
    backgroundColor: "peru",
    alignSelf: 'end',
    borderRadius: "40%",
    overflow: 'hidden',
    marginTop: 0,
    flex: 1,
    height: '90%',

  },
  fingerThree: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    border: '1px solid saddlebrown',
    backgroundColor: "peru",
    alignSelf: 'end',
    borderRadius: "40%",
    overflow: 'hidden',
    marginTop: 0,
    flex: 1,
    height: '100%',

  },
  fingerFour: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    border: '1px solid saddlebrown',
    backgroundColor: "peru",
    alignSelf: 'end',
    borderRadius: "40%",
    overflow: 'hidden',
    marginTop: 0,
    flex: 1,
    height: '78%',
  },
  thumb: {

  }
}))

const MonkeyHand = () => {

  const classes = useStyles();

  const handContainerVariants = {
    hidden: { opacity: 1, marginTop: 0},
    show: {
      opacity: 0.5,
      marginTop: 5,
      transition: {
        delayChildren: 6.5,
        staggerChildren: 0.2,
      }
    }
  };
  const teethItem = {
    hidden: { opacity: 1, marginTop: 0 },
    show: { opacity: 0.5, marginTop: 10 },
    transition: {
      ease: "easeIn",
    }
  };
  const thumbItem = {};

  const aquarium = document.getElementById('aquarium') || {};

  const { offsetWidth } = aquarium;

  // 160 = aquariumContainer is 80 pix below entire room and aquariumWater again 80.
  const topPosition = 160 - 10;

  const handContainerStyle = {
    position: 'absolute',
    top: topPosition,
    left: (offsetWidth || 350) - 150,
    width: 40,
    height: 40,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'stretch',
    height: 40,
    opacity: 1,
    border: '2px red solid'
  };

  return (
    <motion.div style={handContainerStyle} variants={handContainerVariants} initial='hidden' animate='show'>
      <motion.div className={classes.fingerOne} variants={teethItem}>
        <div className={classes.jointsContainer}>
          <div className={classes.joints}></div>
          <div className={classes.joints}></div>
        </div>
        <div className={classes.nailContainer}></div>
      </motion.div>
      <motion.div className={classes.fingerTwo} variants={teethItem}>
        <div className={classes.jointsContainer}>
          <div className={classes.joints}></div>
          <div className={classes.joints}></div>
        </div>
        <div className={classes.nailContainer}></div>
      </motion.div>
      <motion.div className={classes.fingerThree} variants={teethItem}>
        <div className={classes.jointsContainer}>
          <div className={classes.joints}></div>
          <div className={classes.joints}></div>
        </div>
        <div className={classes.nailContainer}></div>
      </motion.div>
      <motion.div className={classes.fingerFour} variants={teethItem}>
        <div className={classes.jointsContainer}>
          <div className={classes.joints}></div>
          <div className={classes.joints}></div>
        </div>
        <div className={classes.nailContainer}></div>
      </motion.div>
      <div className={classes.thumb} variants={thumbItem} />
    </motion.div>)



}

export default MonkeyHand;