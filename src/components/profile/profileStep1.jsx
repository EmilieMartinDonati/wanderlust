import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import AVATAR from "../../public/images/profile/traveler.png";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  personalInfo: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  },
  avatar: {
    width: "40%",
    height: "100%",
    border: "3px dotted grey",
    borderImage: "none",
    borderRadius: "50%",
    padding: "10px",
    "&:active, &:focus, &:hover": {
      border: "3px solid",
      borderImage: "linear-gradient(45deg, purple, orange) 1",
      borderRadius: "50%",
    },
  },
  traveller: {
    width: "100%",
    cursor: "pointer",
  },
  field: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    textAlign: "start",
  },
  input: {
    padding: "8px",
    borderRadius: "10px",
    outline: "none",
    border: "3px dotted gray",
    "&:active, &:focus, &:hover": {
      border: "3px solid",
      borderImage: "linear-gradient(45deg, purple, orange) 1",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      borderRadius: "10px",
    },
  },
}));

const ProfileStep1 = ({ handleChange }) => {
  const classes = useStyles();

  const handleValueChange = (e) => {
    handleChange && handleChange(e.target.name, e.target.value);
  };
  return (
    <div>
      <form className={classes.form}>
        <div className={classes.personalInfo}>
          <div className={classes.avatar}>
            <img src={AVATAR} className={classes.traveller} />
          </div>
          <div className={classes.id}>
            <div className={classes.field}>
              <label className={classes.label}>FIRST NAME</label>
              <input
                className={classes.input}
                type="text"
                name="firstName"
                onChange={(e) => handleValueChange(e)}
              />
            </div>
            <div className={classes.field}>
              <label className={classes.label}>LAST NAME</label>
              <div className={classes.rainbow}>
              <input
                className={classes.input}
                type="text"
                name="lastName"
                onChange={(e) => handleValueChange(e)}
              />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.field}>
          <label className={classes.label}>PRESENTATION</label>
          <textarea
            cols={33}
            rows={10}
            className={classes.input}
            type="text"
            name="presentation"
            onChange={(e) => handleValueChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileStep1;
