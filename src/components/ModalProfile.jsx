import { createUseStyles } from "react-jss";
import { useState, useEffect } from "react";

import ProfileHeader from "./profile/profileHeader";
import ProfileContent from './profile/profileContent';

const useStyles = createUseStyles({
  root: {
    position: "absolute",
    background: "white",
    width: "30%",
    zIndex: 21,
    top: "100px",
    right: 0,
    height: `calc(100vh + 100px)`,
    borderRadius: "1O%",
    fontWeight: 500,
  },
  content: {
    padding: "25px",
  }
});

const ModalProfile = () => {
  const [step, setStep] = useState(1);
  const classes = useStyles();

  useEffect(() => {
  
  }, [step])
  
  return (
    <div className={classes.root}>
      <ProfileHeader step={step} setStep={setStep} />
      <div className={classes.content}>
      <ProfileContent step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default ModalProfile;
