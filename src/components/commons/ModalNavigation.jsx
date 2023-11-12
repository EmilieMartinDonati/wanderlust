import React from "react";

import { createUseStyles } from "react-jss";

import { CENTRAL_MODAL_HEADER_HEIGHT } from "../../actions/layout";

const useStyles = createUseStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    height: CENTRAL_MODAL_HEADER_HEIGHT,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 7fr 1fr",
    width: "100%",
    padding: [10, 0],
    boxShadow: '0px 1px 1px -1px gray',
    backgroundColor: 'bisque',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerBack: {
    composes: "$imageContainer",
  },
  imageContainerForward: {
    composes: "$imageContainer",
  },
  title: {
    fontSize: "12px",
    composes: "$imageContainer",
  },
}));

const ModalNavigation = ({ title = "Mes informations", onGoBack, onGoForward }) => {
  const classes = useStyles();

  const onClickImage = (e, forward = true) => {
    e.stopPropagation();
    forward && !!onGoForward ? onGoForward() : !!onGoBack ? onGoBack() : null;
  };

  const imageStyle = {
    height: "10px",
    width: "10px",
    cursor: "pointer",
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {!!onGoBack ? (
          <div className={classes.imageContainerBack}>
            <img
              alt="arrowBack"
              style={imageStyle}
              src="../src/public/images/profile/backArrow.png"
              onClick={(e) => onClickImage(e, false)}
            />
          </div>
        ) : (
          <div className={classes.imageContainerBack}></div>
        )}
        <div className={classes.title}>{title}</div>
        {!!onGoForward ? (
          <div className={classes.imageContainerForward}>
            <img
              alt="arrowForward"
              style={imageStyle}
              src="../src/public/images/profile/forwardArrow.png"
              onClick={(e) => onClickImage(e, true)}
            />
          </div>
        ) : (
          <div className={classes.imageContainerForward}></div>
        )}
      </div>
    </div>
  );
};

export default ModalNavigation;
