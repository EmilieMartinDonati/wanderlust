import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { createUseStyles } from "react-jss";

/** initial height/ width values of candle (for resetting) */
const TALL_CANDLE_BODY_HEIGHT = 120;
const TALL_CANDLE_BODY_WIDTH = 40;

const SMALL_CANDLE_BODY_HEIGHT = 70;
const SMALL_CANDLE_BODY_WIDTH = 40

const useStyles = createUseStyles((theme) => ({
  root: {
    marginTop: 100,
    backgroundColor: "grey",
    height: 400,
    width: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 50,
    opacity: 1,
  },
  tableEdge: {
    backgroundColor: "#8e82d8",
    height: "8px",
    width: 400,
    border: "0.2px solid navy",
    borderRadius: "10%",
  },
  candlesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    flexDirection: "row",
    gap: "32px",
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
  },
  smallAndAngryCandleBody: {
    backgroundColor: "white",
    border: "0.2px solid #8e82d8",
    borderRadius: "10%",
    height:  SMALL_CANDLE_BODY_HEIGHT,
    width: SMALL_CANDLE_BODY_WIDTH,
    paddingTop: 12,
  },
  tallAndCheekyCandle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    width: 32,
    height: 32,
    opacity: 0,
  }
}));

const CandleAnim = () => {
  const ANIMATION_BEGINNING_DELAY = 1;
  /** background (from day to night to day to night to day ...) */
  const backgroundControls = useAnimation();
  /** tall candle (the one that blows the other out) */
  const tallCandleBodyControls = useAnimation();
  const tallCandleEyesControls = useAnimation();
  const tallCandleMouthControls = useAnimation();

  /** small candle the one that reignites */
  const candleFireControls = useAnimation();
  const smallCandleBodyControls = useAnimation();

  const animate = () => {
    candleFireControls.start({
      opacity: [1, 0, 1],
      transition: {
        ease: "easeInOut",
        duration: 0.2,
        delay: ANIMATION_BEGINNING_DELAY,
        repeat: Infinity,
      },
    })
   tallCandleEyesControls.start({
    opacity: [1, 0, 1],
    alignSelf: "start",
    transition: {
      opacity: {
        ease: "easeInOut",
        delay: ANIMATION_BEGINNING_DELAY + 0.5,
      },
      alignSelf: {
        ease: "easeInOut",
        times: ANIMATION_BEGINNING_DELAY + 0.5,
      }
    },
  })
 tallCandleBodyControls.start({
    height: 140,
    transition: {
      ease: "easeInOut",
      delay: ANIMATION_BEGINNING_DELAY + 1,
    },
  })
 tallCandleMouthControls.start({
    opacity: 1,
    transition: {
      ease: "easeInOut",
      delay: ANIMATION_BEGINNING_DELAY + 1,
    },
  })
  /** beginning of animation on small candle */
  candleFireControls.start({
    transform: 'skew(15deg, 15deg) translate(-2px)',
    opacity: 0,
    transition: {
      transform: {
        // ease: "easeInOut",
        delay: ANIMATION_BEGINNING_DELAY + 1.5,
      },
      opacity: {
        ease: "easeInOut",
        delay: ANIMATION_BEGINNING_DELAY + 2,
      }
    }
  })
  backgroundControls.start({
    backgroundColor: 'black',
    transition: {
      duration: 1.3,
      ease: "easeInOut",
      delay: ANIMATION_BEGINNING_DELAY + 2.5,
    },
  })
  smallCandleBodyControls.start({
    height: 60,
    width: 60,
    background: 'red',
    // opacity: 0,
    transition: {
      height: {
        ease: "easeInOut",
        delay:  ANIMATION_BEGINNING_DELAY + 3,
      },
      width: {
        ease: "easeInOut",
        delay: ANIMATION_BEGINNING_DELAY + 3,
      },
      background: {
        ease: "easeInOut",
        delay: ANIMATION_BEGINNING_DELAY + 3,
      },
      opacity: {
        delay: ANIMATION_BEGINNING_DELAY + 3.5,
      }
    }
  })
} 

  useEffect(() => {
   animate();
  }, []);

  const classes = useStyles();

  return (
    <motion.div className={classes.root} animate={backgroundControls} style={{background: "grey"}}>
      <motion.div className={classes.candlesContainer}>
        <div
          className={classes.smallAndAngryCandle}>
            <motion.div className={classes.candleFire} animate={candleFireControls}></motion.div>
          <div className={classes.smallCandleWick}></div>
          <motion.div className={classes.smallAndAngryCandleBody} animate={smallCandleBodyControls}>
            <motion.div className={classes.eyes}>
              <motion.div className={classes.oneEye}></motion.div>
              <motion.div className={classes.oneEye}></motion.div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div className={classes.tallAndCheekyCandle}>
          <div className={classes.candleWick}></div>
          <motion.div
             id="tallCandleBody"
            className={classes.tallAndCheekyCandleBody}
            animate={tallCandleBodyControls}>
            <motion.div id="tallCandleEyes" className={classes.eyes} animate={tallCandleEyesControls}>
              <motion.div className={classes.oneEye}></motion.div>
              <motion.div className={classes.oneEye}></motion.div>
            </motion.div>
            <motion.div className={classes.mouth} animate={tallCandleMouthControls}></motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
      <motion.div className={classes.tableEdge} />
    </motion.div>
  );
};

export default CandleAnim;
