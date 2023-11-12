import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { isDay } from "../store/index";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  header: {
    width: "100%",
    height: "100px",
    position: "fixed",
    top: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px 0",
    paddingRight: "10px",
    zIndex: 200,
  },
  navbar: {
    flex: "0 1 90%",
  },
  buttonContainer: {
    paddingRight: "20px",
  },
  button: {
    width: "60px",
    height: "20px",
    borderRadius: "25%",
    position: "relative",
    backgroundColor: `#f6d327`,
    backgroundImage: `linear-gradient(315deg, #f6d327 0%, #de4daa 74%)`,
    cursor: "pointer",
  },
  circleLeft: {
    width: "30%",
    height: "15px",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: 0,
    background: "bisque",
  },
  circleRight: {
    width: "30%",
    height: "15px",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    right: 0,
    background: "navy",
  },
  animate: {
    transform: ".35s ease-in-out",
  },
  animateLeftToRight: {
    transform: "translate(50%)",
  },
  animateRightToLeft: {},
});

const Header = ({ down = false, toggleModal, isModalOpen }) => {
  const location = useSelector((state) => state.actionsApp.location);

  const isItDay = useSelector(isDay);
  const classes = useStyles(isItDay);
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    dispatch({ type: "switchMode" });
    setAnimate(!animate);
  };

  const _toggleProfileModal = () => toggleModal && toggleModal();

  return (
    <div
      className={classes.header}
      style={{ background: "slateblue", color: 'white' }}
    >
        <Link to='/calendar'>MY CALENDAR</Link>
      <div
        className={classes.navbar}
        style={{ color: "white" }}
      >
        {down ? (
          <p style={{ color: "red", fontSize: "30px" }}>
            {location?.split(".")[0].toUpperCase()}
          </p>
        ) :
         isItDay ? (
          <motion.div animate={{ opacity: 0.5 }} transition={{ duration: 0.5 }}>
            <p>DAY</p>
          </motion.div>
        ) : (
          <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
            <p>NIGHT</p>
          </motion.div>
        )}
      </div>
      {!down && (
        <div className={classes.buttonContainer}>
          <div className={classes.button} onClick={handleClick}>
            <div
              className={classNames(
                isItDay ? classes.circleLeft : classes.circleRight
              )}
            />
          </div>
        </div>
      )}

      {down && !isModalOpen && (
        <p
          className={classes.buttonContainer}
          style={{ color: "white", cursor: "pointer"  }}
          onClick={_toggleProfileModal}
        >
         MY PROFILE
        </p>
      )}
       {down && isModalOpen && (
        <p
          className={classes.buttonContainer}
          style={{ color: "white", cursor: "pointer" }}
          onClick={_toggleProfileModal}
        >
         CLOSE PROFILE
        </p>
      )}
    </div>
  );
};

export default Header;
