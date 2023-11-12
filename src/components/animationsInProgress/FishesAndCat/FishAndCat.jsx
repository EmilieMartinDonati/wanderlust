
import { createUseStyles } from "react-jss";

import { motion, useAnimate } from 'framer-motion';

import Monkey from "./Monkey";
import MonkeyHand from "./MonkeyHand";

import OneFish from "./OneFish";

import { useEffect, useState } from "react";

const DEFAULT_SPRING_CONFIG = {
     ease: "easeInOut"
}

const useStyles = createUseStyles(() => ({
     rootRoom: {
          display: 'flex',
          height: 500,
          width: 500,
          border: '2px red solid',
          marginTop: 100,
          position: 'relative',
          backgroundColor: 'white',
          marginTop: 100,
     },
     aquariumContainer: {
          position: "absolute",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          top: 80,
          left: 0,
          zIndex: 40,
          height: 400,
          width: 350,
          // border: '1px solid green',
     },
     aquariumAboveWater: {
          backgroundColor: 'white',
          flex: 1,
     },
     aquariumWater: {
          backgroundColor: 'cyan',
          flexBasis: '80%',
          position: 'relative'   /** IMPORTANT IT'S FOR PLACING THE FISHES */
     },
     catContainer: {
          position: "absolute",
          top: 250,
          left: 200,
          zIndex: 60,
          // border: '2px solid navy',
     },
     door: {
          position: 'absolute',
          zIndex: 2,
          backgroundColor: 'brown',
     },
     behindDoor: {
          position: "absolute",
          zIndex: 1,
          backgroundColor: 'yellow',
     },
     firstFish: {
          position: 'absolute',
          top: 20,
          left: 10,
     }
}))





const FishAndCat = ({ }) => {

     const classes = useStyles();

     const [handShown, setHandShown] = useState(false);

     const [scope, animate] = useAnimate();

     useEffect(() => {
          const triggerAnimation = async () => {
               await animate(scope.current, { top: 60 }, { delay: 11, ease: 'easeInOut', duration: 0.6 });
               await animate(scope.current, { left: 60 }, { delay: 1, ease: 'easeInOut', duration: 1 });

               setHandShown(true);
          }
          triggerAnimation();
     }, [])

     return (
          <div className={classes.rootRoom}>
               <div className={classes.aquariumContainer}>
                    {/* <div> */}
                    <div className={classes.aquariumAboveWater}></div>
                    <motion.div className={classes.aquariumWater} id='aquarium'>
                         <OneFish size='medium' rootClassName={classes.firstFish} bewildermentBeginning={10} />
                    </motion.div>
                    {/* </div> */}
               </div>
               <div style={{ position: 'relative' }}>
                   {handShown && <MonkeyHand />}
               </div>
               <motion.div ref={scope} className={classes.catContainer}>
                    <Monkey initialDelay={1} delayBeforeRising={8.5} />
               </motion.div>
          </div>
     )


}

export default FishAndCat;




