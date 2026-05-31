import { createUseStyles } from "react-jss";
import backArrow from "../../public/images/profile/backArrow.png";
import forwardArrow from "../../public/images/profile/forwardArrow.png";
import close from "../../public/images/profile/close.png";
import { useAppDispatch } from "../../store/hook";

const useStyles = createUseStyles((theme) => ({
  root: {
    height: "60px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrows: {
    cursor: "pointer",
  },
}));

const ProfileHeader = ({ setStep = null, step = 1 }) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handlePrevAction = () => setStep && setStep(step - 1);

  const handleNextAction = () => setStep(step + 1);

  const handleClose = () => dispatch({ type: "toggleModal" });

  return (
    <div className={classes.root}>
      <img
        className={classes.arrows}
        src={step !== 1 ? backArrow : close}
        onClick={step !== 1 ? handlePrevAction : handleClose}
      />
      <img
        className={classes.arrows}
        src={step !== 3 ? forwardArrow : close}
        onClick={step !== 3 ? handleNextAction : handleClose}
      />
    </div>
  );
};

export default ProfileHeader;
