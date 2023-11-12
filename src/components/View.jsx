import Header from "./Header";
import Carousel from "./Carousel";
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
  draggableItem: {
    backgroundColor: "red",
    width: "50px",
    height: "50px",
  },
  dropZone: {
    background: "green",
    width: "100%",
    height: "20vh",
    display: "flex",
    justifyContent: "space-between",
  },
  dropZoneItem: {
    height: "10vh",
    width: "20%",
    border: "2px solid red",
  },
  overlay: {
    width: '70%',
  }
});

const View = ({}) => {
  const isItDay = useSelector((state) => state.actionsApp.isDay);
  const isModalOpen = useSelector((state) => state.actionsApp.isProfileModalOpen);

  // To change the header depending on the scroll of the page

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const list = ["a", "b", "c", "d", "e", "f"];

  const classes = useStyles(isItDay);
  return (
    <>
      <div
        className={classNames(classes.root, isModalOpen && classes.overlay)}
        style={{ background: isItDay ? "bisque" : "navy" }}
      >
        <Carousel isModalOpen={isModalOpen} />
      </div>
      {/* <Footer />  */}
    </>
  );
};

export default View;
