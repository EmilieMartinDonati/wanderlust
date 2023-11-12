import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useState, useEffect } from "react";

import { HOMESDATA } from "../../bogusData/homes";
import { BOOKINGSDATA } from "../../bogusData/bookings";
import { USERSDATA } from "../../bogusData/users";
import PROFILE from "../../public/images/overlay-profile.jpg";
import STAR from "../../public/images/star.png";
import EYE from "../../public/images/eye.png";

import { warnPotentialUsersOfDisgrace } from "../../actions/bookings";

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: "20px",
  },
  title: {
    color: "slateblue",
    background: "bisque",
    paddingTop: "10px",
    paddingBottom: "15px",
    borderRadius: "15px",
    border: "2px slateblue solid",
    textAlign: "justify",
    paddingLeft: '10px',
    fontWeight: 600,
  },
  warnDisgraceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    background: "navy",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px",
  },
  usersToBeWarned: {
    border: "2px red solid",
    borderRadius: "10px",
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    width: "30%",
    margin: "10px",
    background: "bisque",
  },
  profileContainer: {
    position: "relative",
    display: "flex",
  },
  name: {
    position: "absolute",
    top: "0",
    textTransform: "capitalize",
    color: "slateblue",
    fontWeight: 800,
  },
  text: {
    display: "flex",
    width: '100%',
    justifyContent: "space-between",
  },
  image: {
    maxWidth: "120px !important",
    borderRadius: "70px",
    "&:hover": {
        transform: `scale(1.5)`,
        zIndex: 3,
      },
  },
  star: {
    maxWidth: "40px",
    "&:hover": {
        transform: `scale(2)`,
        zIndex: 3,
      },
  },
}));

const usersToWarn = warnPotentialUsersOfDisgrace(
  BOOKINGSDATA,
  HOMESDATA,
  USERSDATA
);

const Disgrace = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.title}>
        THOSE TRAVELLERS SHOULD BE WARNED THAT THEIR BOOKINGS IN WAITING HAVE
        BAD RATINGS
      </p>
      <div className={classes.warnDisgraceContainer}>
        {usersToWarn.map((data) => {
          let arr = [];
          arr.length = 4 - data.user.CCLevel;
          arr.fill("");
          return (
            <div className={classes.usersToBeWarned}>
              <div className={classes.profileContainer}>
                <img src={PROFILE} className={classes.image} />
                <p className={classes.name}>{data.user.name.toUpperCase()}</p>
              </div>
              <div className={classes.text}>
                <div>
                  <h4>COSTUMER CARE LEVEL</h4>
                  <p>
                    {arr.map((el) => (
                      <img className={classes.star} src={STAR} />
                    ))}
                  </p>
                </div>
                <div style={{alignSelf: 'end'}}>
                  <h4>BOOKING</h4>
                  <p>
                    <img className={classes.star} src={EYE} />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Disgrace;
