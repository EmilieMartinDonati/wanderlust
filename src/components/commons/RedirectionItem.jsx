import React from "react";
import { motion } from 'framer-motion';

import { createUseStyles } from "react-jss";
import classNames from "classnames";

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: [20, 20],
    display: 'flex',
    gap: 12,
  },
  icon: {
    cursor: 'pointer',
    height: '20px',
    width: '20px'
  },
  mainContent: {
    fontSize: 12,
  }
}))

const RedirectionItem = ({ mainContent, secondaryContent = null, usedIcon = null, onRedirect, bottomBordered = true, enhanced = false }) => {

  const classes = useStyles();

  const imageSrc = usedIcon || '../src/public/images/eye.png';

  const style = { display: 'flex', justifyContent: 'space-between', width: '100%' };
  if (bottomBordered) {
    style.borderBottom = '2px solid grey';
  }
  if (enhanced) {
    style.borderLeft = '2px solid blue';
  }

  return (<div className={classes.root}><motion.div style={style}>
    <div className={classes.mainContent}>{mainContent}</div>
    <div><img src={imageSrc} alt="'logo" className={classes.icon} onClick={onRedirect} /></div>
  </motion.div>
  </div>)

}


export default RedirectionItem;