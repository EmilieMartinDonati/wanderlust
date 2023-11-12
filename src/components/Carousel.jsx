import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { motion, AnimatePresence } from "framer-motion";

import Tree from "../public/images/tree.jpg";
import Milky from "../public/images/milky.jpg";
import Lake from "../public/images/lake.jpg";
import Street from "../public/images/street.jpg";
import Beach from "../public/images/beach.jpg";
import Play from "../public/images/play.jpg";
import Bridge from "../public/images/bridge.jpg";

import { createUseStyles } from "react-jss";
import { useEffect } from "react";

const useStyles = createUseStyles({
  root: {
    height: "100vh",
    width: "100% !important",
    // background: "navy",
    display: "flex",
    // flexWrap: "nowrap",
    // overflow: "hidden",
    justifyContent: "center",
    position: "relative",
    paddingTop: '20px',
  },
  overlay: {
    opacity: 0.8,
    pointerEvents: "none",
  },
  smallFrame: {
    alignSelf: "center",
    borderRadius: "10px",
    cursor: "pointer",
  },
  frame: {
    width: "50%",
    borderRadius: "10px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    height: '80vh',
    zIndex: "20",
    border: "20px solid black",
    transition: "0.4s all ease-in-out",
    "&:hover": {
      transform: "scaleX(1.5)",
      cursor: "pointer",
    },
  },
  centralImage: {
    backgroundSize: "cover",
    height: "80vh",
    width: "100%",
    transition: "0.4s all ease-in-out",
    "&:hover": {
      transform: "scaleY(1.5)",
      cursor: "pointer",
    },
  },
  sideImage: {
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    borderRadius: "10px",
  },
  buttonLeft: {
    position: "absolute",
    left: "0",
    top: "40px",
    height: "20px",
    cursor: "pointer",
  },
  buttonRight: {
    position: "absolute",
    right: "0",
    top: "40px",
    height: "20px",
    cursor: "pointer",
  },
});

const Carousel = ({ isModalOpen }) => {
  const myArray = [Tree, Milky, Bridge, Street, Beach, Play, Lake];
  const [images, setImages] = useState(myArray);
  const bigImg = useRef(null);
  const rootRef = useRef(null);
  const [inspectedWidth, setInspectedWidth] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setInspectedWidth(rootRef.current.clientWidth);
    function handleResize() {
      setInspectedWidth(rootRef.current.clientWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const classes = useStyles();

  const handleCentralImageClick = (image) => { };

  const handleLeftClick = (index) => {
    let myNewArray = Array.from(images);
    let imageTarget = images[index];
    let lastElem = myNewArray.pop();
    myNewArray.unshift(lastElem);
    setImages(myNewArray);
    dispatch({
      type: "changeLoc",
      location: imageTarget.substring(19),
    });
  };

  const handleRightClick = (index) => {
    let myNewArray = Array.from(images);
    let imageTarget = images[index];
    let lastElem = myNewArray.shift();
    myNewArray.push(lastElem);
    setImages(myNewArray);
    dispatch({
      type: "changeLoc",
      location: imageTarget.substring(19),
    });
  };

  return (
    <div
      ref={rootRef}
      className={classNames(classes.root, isModalOpen && classes.overlay)}
    >
      {images.map((image, index) => {
        let incorrectLength = myArray.length % 2 === 0;
        let middleIndex = Math.floor(myArray.length / 2);
        let originalWidth = inspectedWidth;
        let distance = Math.abs(middleIndex - index);
        let formattedWidth =
          distance === 0
            ? Math.round(originalWidth / 4)
            : Math.round(originalWidth / (distance * 6));
        if (incorrectLength && index === 0) return;
        else if (index === middleIndex)
          return (
            <AnimatePresence>
              <div className={classes.frame} key={index}>
                <img
                  className={classes.centralImage}
                  ref={bigImg}
                  src={image}
                  onClick={() => handleCentralImageClick(image)}
                />
              </div>
            </AnimatePresence>
          );
        else
          return (
            <div
              className={classes.smallFrame}
              key={index}
              style={{
                marginRight: index < middleIndex ? "-20px" : undefined,
                marginLeft: index > middleIndex ? "-20px" : undefined,
                marginTop: "-20px",
                width: `${formattedWidth}px`,
                height:
                  distance === 1 ? `30vh` : distance === 2 ? "20vh" : "10vh",
                zIndex: `calc(20 - ${distance})`,
              }}
              onClick={
                index > middleIndex
                  ? () => handleRightClick(index)
                  : index < middleIndex
                    ? () => handleLeftClick(index)
                    : null
              }
            >
              <img className={classes.sideImage} src={image} />
            </div>
          );
      })}
    </div>
  );
};

export default Carousel;
