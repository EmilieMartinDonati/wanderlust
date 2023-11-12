import {
  useSpring,
  useChain,
  animated,
  useSpringRef
} from 'react-spring';

import { useEffect, useState, useLayoutEffect } from 'react';
import { createUseStyles } from "react-jss";


/** initial height/ width values of candle (for resetting) */
const TALL_CANDLE_BODY_HEIGHT = 120;
const TALL_CANDLE_BODY_WIDTH = 40;

const SMALL_CANDLE_BODY_HEIGHT = 70;
const SMALL_CANDLE_BODY_WIDTH = 40;

const PURPLE_THEME = "#8e82d8";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'grid',   /**  main container is grid because flexBox when we animate height of element is messy */
    gridTemplateRows: ['300px', '1fr'].join(' '),  // only syntax that does seem to work w/ react jss
    backgroundColor: "grey",
    marginTop: 100,
    height: 400,
    width: 600,
  },
  tableEdgeContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
  },
  tableEdge: {
    backgroundColor: "#8e82d8",
    height: "8px",
    width: 400,
    border: "0.2px solid navy",
    borderRadius: "10%"
  },
  candlesContainer: {
    display: 'grid',
    gridTemplateColumns:['3fr', '1fr', '3fr'].join(' '),
    paddingLeft: 200,
    paddingRight: 200
  },
  candleWick: {
    width: 2,
    height: 16,
    backgroundColor: "#8e82d8",
  },
  smallCandleWick: {
    width: 2,
    height: 8,
    backgroundColor: "#8e82d8",
  },
  candleFire: {
    width: 12,
    height: 24,
    backgroundColor: "red",
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    background: "#FF9800",
    opacity: 1,
  },
  smallAndAngryCandle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'end',
  },
  smallAndAngryCandleBody: {
    backgroundColor: "white",
    border: "0.2px solid #8e82d8",
    borderRadius: "10%",
    height: SMALL_CANDLE_BODY_HEIGHT,
    width: SMALL_CANDLE_BODY_WIDTH,
    paddingTop: 12,
  },
  tallAndCheekyCandle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'end',
  },
  tallAndCheekyCandleBody: {
    backgroundColor: "white",
    border: "1px solid #8e82d8",
    height: TALL_CANDLE_BODY_HEIGHT,
    width: TALL_CANDLE_BODY_WIDTH,
    display: 'flex',
    flexDirection: "column",
    paddingTop: 12,
    justifyContent: 'start',
    gap: '8px',
    borderRadius: "10%",
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  eyes: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    gap: 8,
  },
  oneEye: {
    borderRadius: '50%',
    backgroundColor: '#8e82d8',
    width: 8,
    height: 8,
  },
  mouth: {
    borderRadius: '50%',
    backgroundColor: '#8e82d8',
    alignSelf: 'center',
  },
  calembourContainer: {
   backgroundColor: 'black',
   opacity: 0.5,
  },
  calembredaine: {
    color: PURPLE_THEME,
  }
}));

const CandleSpringAnimation = () => {


  const classes = useStyles();

  /** tall candle */
  const springCandleFire = useSpringRef();
  const springTallCandleEyes = useSpringRef();
  const springTallCandleBody = useSpringRef();
  const springTallCandleMouth = useSpringRef();

  /** background (day/night) when the candle wick is blown out **/
  const springBackground = useSpringRef();
  const springFireExtinguish = useSpringRef();
  const springFireExtinguishFinish = useSpringRef();

  /** the small candle that reignites its own candle wick */
  const springSmallCandleBody = useSpringRef(); /** first it is resized and becomes red */
  const springSmallCandleBodyPulsate = useSpringRef();
  const springSmallCandleAngryLeftEye = useSpringRef();
  const springSmallCandleAngryRightEye = useSpringRef();

  const springCandleFireStyle = useSpring({
    ref: springCandleFire,
    from: { opacity: 1 },
    to: { opacity: 0.5 },
  })

  const springTallCandleEyesStyle = useSpring({
    ref: springTallCandleEyes,
    from: { alignSelf: 'center' },
    to: { alignSelf: 'start' },
    config: {ease: 'easeInOut'}
  })

  // const springTallCandleEyesStyles = useSpring({
  //    /** I need to manage the blinking and it's going to be annoying man */
  // })

  const springTallCandleBodyStyle = useSpring({
    ref: springTallCandleBody,
    from: { height: TALL_CANDLE_BODY_HEIGHT },
    to: { height: 140 }
  })

  const springTallCandleMouthStyle = useSpring({
    ref: springTallCandleMouth,
    from: { width: 0, height: 0 },
    to:     {width: 32,
    height: 32},
    config: {
      ease: "easeInOut",
      transition: 3000,
    }
  })

  const springBackgroundStyle = useSpring({
    ref: springBackground,
    from: { backgroundColor: 'gray' },
    to: { backgroundColor: 'black' }
  })

  const springFireExtinguishStyle = useSpring({
    ref: springFireExtinguish,
    from: { transform: 'skew(0deg, 0deg) translate(0px)' },
    to: { transform: 'skew(15deg, 15deg) translate(-2px)' }
  })

  const springFireExtinguishFinishStyle = useSpring({
    ref: springFireExtinguishFinish,
    from: { opacity: 0.5 },
    to: { opacity: 0 },
  })

  const springSmallCandleBodyStyle = useSpring({
    ref: springSmallCandleBody,
    from: { height: SMALL_CANDLE_BODY_HEIGHT, width: SMALL_CANDLE_BODY_WIDTH, backgroundColor: "white" },
    to: { height: 60, width: 60, backgroundColor: "red" },
  })

  const springSmallCandleBodyPulsateStyle = useSpring({
    ref: springSmallCandleBodyPulsate,
    from: { opacity: 1 },
    to: { opacity: 0.5 }
  });

  const springSmallCandleAngryLeftEyeStyle = useSpring({
    ref: springSmallCandleAngryLeftEye,
    from: {
     transform: 'skew(0deg, 0deg)',
    },
    to: {
      transform: 'skew(15deg, 15deg)',
    }
  })
  const springSmallCandleAngryRightEyeStyle = useSpring({
    ref: springSmallCandleAngryRightEye,
    from: {
     transform: 'skew(0deg, 0deg)',
    },
    to: {
      transform: 'skew(-15deg, -15deg)',
    }
  })

  /** we need those utils to know whether we want to  */

  useEffect(() => {

  //  const totalAnimationTime =  _computeTotalAnimationDuration(); /** estimated */

    const _resetTallCandleEyes = () => {
      springTallCandleEyes.start({ alignSelf: "center", config: { ease: 'easeInOut' } });
      springTallCandleBody.start({ height: TALL_CANDLE_BODY_HEIGHT, config: { ease: 'easeInOut' } });
      springTallCandleMouth.start({ width: 0, height: 0, config: { ease: 'easeInOut' } });
    }
    const _resetSmallCandleBody = () => {
      springSmallCandleBody.start({ width: SMALL_CANDLE_BODY_WIDTH, height: SMALL_CANDLE_BODY_HEIGHT, backgroundColor: "white", config: { ease: 'easeInOut' } });
      springSmallCandleBodyPulsate.start({opacity: 1});
      springSmallCandleAngryLeftEye.start({transform: 'skew(0deg, 0deg)'})
      springSmallCandleAngryRightEye.start({transform: 'skew(0deg, 0deg)'})
    }
    const _reigniteCandleWick = async () => {
      springFireExtinguish.start({transform: 'skew(0deg, 0deg) translate(0px)'});
      springFireExtinguishFinish.start({opacity: 1});
      springBackground.start({backgroundColor: 'gray'});

    }
    /** we reset small candle : right after blowing out the small candle */
    const timeToResetTallCandle = _computeAnimationDurationAtIndex(springFireExtinguishFinish); 
    const resetTallCandleEyesTimeout = setTimeout(() => { _resetTallCandleEyes() }, timeToResetTallCandle);

    /** we reset small candle after it has gotten angry */
    const timeToResetSmallCandle = _computeAnimationDurationAtIndex(springSmallCandleBody); 
    const resetSmallCandleBodyTimeout = setTimeout(() => { _resetSmallCandleBody() }, timeToResetSmallCandle + 600); /** we let is linger a bit */
    const reigniteCandleWickTimeout = setTimeout(() => { _reigniteCandleWick() }, timeToResetSmallCandle + 600);

    return async () => {
      await Promise.all([clearTimeout(resetTallCandleEyesTimeout), clearTimeout(resetSmallCandleBodyTimeout), clearTimeout(reigniteCandleWickTimeout)]);
    }
  }, []);


  /** CHAINING OF ANIMATIONS TO GET OUR SEQUENCE */
  const chainAnimations = [springCandleFire, springTallCandleEyes, springTallCandleEyes, springTallCandleBody, springTallCandleMouth, springFireExtinguish, springFireExtinguishFinish, springBackground, springSmallCandleAngryLeftEye, springSmallCandleAngryRightEye, springSmallCandleBody];
  const chainTimeStamps = [0, 0.2, 0.4, 0.6, 0.8, 1.1, 1.4, 1.7, 2, 2, 2];
  useChain(chainAnimations, chainTimeStamps); // Pass an array of spring refs and a delay array

  /** NB 
   * it's hard to handle the part of the sequences where we reset the elements properties to their values,
   * eg when the candlewick that has disappeared reignites
   * but also when the candles themselves get back to their initial width, height, color, etc.
   * Idk but I didn't manage, same in framer motion
   * So all the resetters are handled with timeouts inside the useEffect thanks to the api method start. (thank you useSpring because it didn't work in the slightest in framer-motion)
   * To know which time we should assign to the timeouts, we have the utils "compute" : they compute how many time has elapsed after the end of a given animation in the useChain.
   */

  const _computeDuration = (arrayOfStartingTimes, inMilliseconds = false) => {
    const lastStartingValueInMs = Math.max(...arrayOfStartingTimes) * 1000;
    const total = lastStartingValueInMs + (arrayOfStartingTimes.length * 300); /** 300 ms default time of duration with react-spring */
    return inMilliseconds ? total : total / 1000;
  }

  // const _computeTotalAnimationDuration = (addedTimeOutOfUseChain = 0) => {
  //   const arrayForUseChain = [0, 0.2, 0.4, 0.6, 0.8, 1.1, 1.4, 1.7, 2, 2.3];
  //   return _computeDuration(arrayForUseChain, true) + addedTimeOutOfUseChain;
  // }

  const _computeAnimationDurationAtIndex = (apiName) => {
    const arrayForUseChain = [...chainTimeStamps];
    const arrayForUseChainNames = [...chainAnimations];
    const indexOfApiAnimation = arrayForUseChainNames.indexOf(apiName);
    const slicedArrayOfStartingTimes = arrayForUseChain.slice(0, indexOfApiAnimation);
    return _computeDuration(slicedArrayOfStartingTimes, true);
  }


  return (
    <animated.div className={classes.wrapper} style={springBackgroundStyle}>
      <animated.div className={classes.candlesContainer}>
        <div
          className={classes.smallAndAngryCandle}>
          <animated.div className={classes.candleFire} style={{ ...springCandleFireStyle, ...springFireExtinguishStyle, ...springFireExtinguishFinishStyle }}></animated.div>
          <div className={classes.smallCandleWick}></div>
          <animated.div style={{ ...springSmallCandleBodyStyle, ...springSmallCandleBodyPulsateStyle }} className={classes.smallAndAngryCandleBody} id='smallCandleBody'>
            <animated.div className={classes.eyes} >
              <animated.div className={classes.oneEye} style={springSmallCandleAngryLeftEyeStyle}></animated.div>
              <animated.div className={classes.oneEye} style={springSmallCandleAngryRightEyeStyle}></animated.div>
            </animated.div>
          </animated.div>
        </div>
        <div className={classes.calembourContainer}><p className={classes.calembredaine}>En attendant Godot</p></div> {/** empty div for grid to preserve gap */}
        <animated.div className={classes.tallAndCheekyCandle}>
          <div className={classes.candleWick}></div>
          <animated.div
            className={classes.tallAndCheekyCandleBody}
            style={springTallCandleBodyStyle}>
            <animated.div className={classes.eyes} style={springTallCandleEyesStyle}>
              <animated.div className={classes.oneEye}></animated.div>
              <animated.div className={classes.oneEye}></animated.div>
            </animated.div>
            <animated.div className={classes.mouth} style={springTallCandleMouthStyle}></animated.div>
          </animated.div>

        </animated.div>
      </animated.div>
      <div className={classes.tableEdgeContainer}><animated.div className={classes.tableEdge} /></div>
    </animated.div>
  );
};


export default CandleSpringAnimation;