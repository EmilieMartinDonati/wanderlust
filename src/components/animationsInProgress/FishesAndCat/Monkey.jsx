
import { createUseStyles } from "react-jss";

import { motion, useAnimation } from 'framer-motion';

import { useState, useEffect } from "react";


const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  hairContainer: {
    height: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  rootHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  catHead: {
    width: '100px',
    height: '100px',
    // border: '2px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '40%',
    // overflow: 'hidden',
    background: 'transparent',
    position: 'relative',
  },
  oneEarLeft: {
    height: 25,
    width: 25,
    backgroundColor: "pink",
    // transform: 'skew(15deg)',
    borderRadius: '50%',
    marginRight: -8,
    opacity: 0,
  },
  oneEarRight: {
    height: 25,
    width: 25,
    borderRadius: '50%',
    backgroundColor: "pink",
    marginLeft: -8,
    opacity: 0,
    // transform: 'skew(-15deg)',
  },
  catHeadTop: {
    // border: '2px solid green',
    borderRadius: '50% 50% 0% 0%',
    width: '80%',
    height: '40%',
    display: 'flex',
    alignItems: 'stretch',
    // overflow: 'hidden',
    background: 'transparent',
  },
  catHeadBottom: {
    // border: '2px solid navy',
    borderRadius: '50%',
    width: '100%',
    height: '60%',
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'center',
    background: 'transparent',
    alignItems: 'center',
    position: 'relative',
  },
  snout: {
    position: 'absolute',
    top: 6,
    left: "calc(50% - 10px)",
    height: 25,
    width: 20,
    backgroundColor: "tranparent",
    borderRadius: '50%',
  },
  mouthWrapper: {
    // border: '2px solid red',
    display: 'flex',
    height: '50%',
    width: '70%',
    alignItems: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '0% 0% 60% 60%',
    borderBottom: '1px solid black',
    overflow: 'hidden',
  },
  mouth2: {
    flexBasis: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    height: "100%",
    // width: '60%',
    borderBottom: '1px solid black',
  },
  mouthTeeth: {
    flex: 1,
    borderLeft: '1.5px solid black',
    borderRight: '1.5px solid black',
    opacity: 0.1,
  },
  mouthHidder: {
    background: "cyan",
    position: 'absolute',
    borderBottom: '2px solid black',
    height: '80%',
    width: '100%',
    top: 0,
    left: 0,
    borderRadius: '0% 0% 50% 50%',
    zIndex: 3,
  },
  eyesWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flex: 1,
    gap: '10px',
  },
  oneEyeContainer: {
    // overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column', /** for the eyelid */
    justifyContent: 'center',
    alignItems: "center",
    gap: '4px',
  },
  oneEyelid: {
    position: 'absolute',
    borderRadius: '50%',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    zIndex: 4000,
    backgroundColor: "gray",
    borderBottom: '1px solid black',
  },
  oneEye: {
    boxSizing: 'border-box',
    borderRadius: '50%',
    backgroundColor: 'black',
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  oneIris: {
    backgroundColor: "red",
    height: '50%',
    width: '50%',
    borderRadius: '50%',
    opacity: 0,
  },
  eyebrow: {
    backgroundColor: 'black',
    width: 10,
    height: 2,
    opacity: 0,
  },
}))

const Monkey = ({ initialDelay = 0, delayBeforeRising = 11 }) => {

  const classes = useStyles({ initialDelay });

  const [animShouldStart, setAnimShouldStart] = useState(false);

  useEffect(() => {
    const amimationStartTimeOut = setTimeout(() => { setAnimShouldStart(true) }, 3000);
    return () => {
      clearTimeout(amimationStartTimeOut);
    }
  }, [])

  useEffect(() => {
    // if (animShouldStart) {
    firstEyeLidControls.start({
      top: -20,
      backgroundColor: ["gray", "slateblue", "blue"],
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: initialDelay + 1
      }
    })
    secondEyeLidControls.start({
      top: -100,
      backgroundColor: ["gray", "slateblue", "blue"],
      borderBottom: '1px solid transparent',
      opacity: [1, 0, 1, 0, 1, 0, 0],
      transition: {
        top: {
          duration: 2.5,
          ease: 'easeOut',
          delay: initialDelay + 1.2
        },
        borderBottom: {
          duration: 0.5,
          ease: 'easeOut',
          delay: initialDelay + 1.2
        },
       backgroundColor: {
        duration: 1,
        ease: [initialDelay + 1.4, initialDelay + 1.6, initialDelay + 1.8],
        delay: initialDelay + 1.4,
       },
       opacity: {
        duration: 1,
        ease: 'easeOut',
        delay: initialDelay + 1.6,
       }
      }
    })
    irisControls.start({
      opacity: 1,
      transition: {
        ease: "easeInOut",
        delay: initialDelay + 1.5
      }
    })
    blinkingEyeControls.start({
      opacity: [1, 0, 1],
      transition: {
        ease: "easeInOut",
        delay: initialDelay + 5.5,
      }
    })

    // When it has risen, we show it's entire face.
     earControls.start({
      opacity: 1,
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
     eyebrowsControls.start({
      opacity: 1,
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
     backgroundDarkBrownControls.start({
      backgroundColor: "saddlebrown",
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
     backgroundLightBrownControls.start({
      backgroundColor: "peru",
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
     snoutControls.start({
      backgroundColor: "black",
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
     mouthHidderControls.start({
      backgroundColor: "peru",
      transition: {
        delay: delayBeforeRising,
        duration: 0.5,
        ease: 'easeIn'
      }
     })
    // }
  }, [animShouldStart])


  const irisControls = useAnimation();

  const firstEyeLidControls = useAnimation();
  const secondEyeLidControls = useAnimation();
  const blinkingEyeControls = useAnimation();

  const earControls = useAnimation();
  const eyebrowsControls = useAnimation();
  const backgroundDarkBrownControls = useAnimation();
  const backgroundLightBrownControls = useAnimation();
  const snoutControls = useAnimation();
  const mouthHidderControls = useAnimation();


  //-------------------------------------//
  //--------- STAGGER CAT TEETHS --------//
  //-------------------------------------//
  const teethContainerVariants = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay + 6.5,
        staggerChildren: 0.2,
      }
    }
  };
  const teethItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    transition: {
      ease: "easeIn",
    }
  };


  return (
    <div className={classes.root}>
      <div className={classes.rootHead}>
        <motion.div className={classes.oneEarLeft} animate={earControls}></motion.div>
        <motion.div className={classes.catHead} animate={backgroundDarkBrownControls}>
          <motion.div className={classes.catHeadTop} animate={backgroundLightBrownControls}>
            <div className={classes.eyesWrapper}>
              <div className={classes.oneEyeContainer}>
                <motion.div className={classes.eyebrow} animate={eyebrowsControls}></motion.div>
                <motion.div className={classes.oneEye} animate={blinkingEyeControls}>
                  <motion.div className={classes.oneEyelid} animate={firstEyeLidControls}></motion.div>
                  <motion.div className={classes.oneIris} animate={irisControls}></motion.div>
                </motion.div>
              </div>
              <div className={classes.oneEyeContainer}>
                <motion.div className={classes.oneEye} animate={blinkingEyeControls}>
                  <motion.div className={classes.oneEyelid} animate={secondEyeLidControls}></motion.div>
                  <motion.div className={classes.oneIris} animate={irisControls} />
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div className={classes.catHeadBottom} animate={backgroundLightBrownControls}>
            <motion.div className={classes.snout} animate={snoutControls}></motion.div>
            <div className={classes.mouthWrapper}>
              <motion.div className={classes.mouth2} initial='hidden' animate='show' variants={teethContainerVariants}>{[4, 3, 2, 1, 0].map((el) => <motion.span key={el} variants={teethItem} className={classes.mouthTeeth}></motion.span>)}</motion.div>
              <motion.div className={classes.mouthHidder} animate={mouthHidderControls}></motion.div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className={classes.oneEarRight} animate={earControls}></motion.div>
      </div>
    </div>)
}

export default Monkey;
