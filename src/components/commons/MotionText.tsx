import { motion } from "framer-motion";
import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  motionContainer: {
    position: "relative",
    width: "100%",
    alignSelf: 'start',
  }
}))

interface MotionTextProps {
  children?: React.ReactNode
  title?: string
}

const MotionText = ({ children, title = 'Salut' }: MotionTextProps) => {

  const classes = useStyles();

  const motionContainer = {
    width: "100%",
    alignSelf: 'start',
    height: 50,
    textAlign: 'start' as const,
    position: 'relative' as const,
  }

  const style = {
    left: 0,
    whiteSpace: 'no-wrap' as const,
    position: 'absolute' as const,
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
