import { motion } from "framer-motion";
import { useLayoutEffect } from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  motionContainer: {
    position: "relative",
    width: "100%",
    alignSelf: 'start',
  }
}))

const MotionText = ({ children, title = 'Salut' }) => {

  const classes = useStyles();

  const motionContainer = {
    width: "100%",
    alignSelf: 'start',
    height: 50,
    textAlign: 'start',
    position: 'relative',
  }

  const style = {
    left: 0,
    whiteSpace: 'no-wrap',
    position: 'absolute',
  }

  const initial = {
    left: 0,
  }

  const animate = {
    left: 'calc(100% - 40px)',
  }

  const transition = {
    duration: 5,
    ease: "easeInOut",
    yoyo: 4,
    repeatDelay: 1,
  };

  return (
    <div style={motionContainer}>
      <motion.span
        style={style}
        initial={initial}
        // animate={animate}
        // transition={transition}
      >
        {title}
      </motion.span>
    </div>
  );
};

export default MotionText;
