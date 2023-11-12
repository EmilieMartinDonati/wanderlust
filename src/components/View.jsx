import Header from "./Header";
import PerspectiveCarousel from "./PerspectiveCarousel";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect} from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import Overlay from "../public/images/overlay-profile.jpg";

const useStyles = createUseStyles({
  root: {
    marginTop: "100px",
    height: "100vh",
  },
  overlay: {
    width: '70%',
  }
});

const View = ({}) => {
  const isItDay = useSelector((state) => state.actionsApp.isDay);
  const isModalOpen = useSelector((state) => state.actionsApp.isProfileModalOpen);

  const classes = useStyles(isItDay);
  return (
      <div
        className={classNames(classes.root, isModalOpen && classes.overlay)}
        style={{ background: isItDay ? "bisque" : "navy" }}
      >
        <PerspectiveCarousel isModalOpen={isModalOpen} />
      </div>
  );
};

export default View;
