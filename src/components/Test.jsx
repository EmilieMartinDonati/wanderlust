import React, {
  useEffect,
  useRef,
} from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { toggleOnBoardingModal } from "../actions/owners";

import ModalHome from "./ModalHome";

import { Outlet } from "react-router";
import OwnerInformation from "./ownerflow/OwnerInformation";

import { CENTRAL_MODAL_HEIGHT, CENTRAL_MODAL_WIDTH } from "../actions/layout";

const useStyles = createUseStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > :first-child": {
      color: "red",
      textDecoration: "underline",
    },
  },
  overlay: {
    opacity: 0.5,
  },
  modalRoot: {
    position: "fixed",
    top: ({ modalHeight }) => `calc(50% - ${modalHeight / 2})`,
    left: ({ modalWidth }) => `calc(50% - ${modalWidth / 2})`,
    background: "bisque",
    display: "flex",
    flexDirection: "column",
    padding: [20, 0],
    minWidth: CENTRAL_MODAL_WIDTH,
    height: CENTRAL_MODAL_HEIGHT,
    maxHeight: CENTRAL_MODAL_HEIGHT,
    minHeight: CENTRAL_MODAL_HEIGHT,
    width: CENTRAL_MODAL_WIDTH,
    zIndex: 40000,
    borderRadius: "10px",
  },
}));

const Test = () => {
  const modalRef = useRef();
  const modalWidth = useRef(0);
  const modalHeight = useRef(0);

  const classes = useStyles({ modalWidth, modalHeight });

  const isModalOpen = useSelector(
    (state) => state.ownerOnBoarding.onboardingModalOpen
  );

  const dispatch = useDispatch();

  const pathName = window.location.pathname;
  const splittedPathname = pathName.split("/");

  const isInformationOverview =
    splittedPathname[splittedPathname.length - 1] === "test";

  useEffect(() => {
    const rootModal = modalRef.current;
    if (!rootModal) return;
    const width = rootModal.offsetWidth;
    const height = rootModal.offsetHeight;
    modalWidth.current = width;
    modalHeight.current = height;
  }, [isModalOpen]);

  return (
    <div className={classes.root} onClick={() => dispatch(toggleOnBoardingModal(!false))}>
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(toggleOnBoardingModal(!isModalOpen))}
      >
        Entrez vos informations
      </h1>
      <ModalHome
        pathname={pathName}
        ref={modalRef}
        isVisible={isModalOpen}
        className={classes.modalRoot}
      >
        {isInformationOverview ? <OwnerInformation /> : <Outlet />}
      </ModalHome>
    </div>
  );
};

export default Test;
