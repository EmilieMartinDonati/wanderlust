import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useState, useEffect } from "react";
import Disgrace from "./disgrace";
import Dormant from "./dormant";

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: '20px',
    marginTop: '100px',
    height: `calc(100vh + 100px)`,
    background: 'lightgrey',
}}));


const AdminSupervisionPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Disgrace />
        <Dormant />
    </div>
  );
};

export default AdminSupervisionPanel;
