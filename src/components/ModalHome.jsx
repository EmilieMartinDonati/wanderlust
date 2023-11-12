import React, { forwardRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router";
// import { toggleOnBoardingModal } from "../actions/owners";

import ModalNavigation from "./commons/ModalNavigation";

const ModalHome = forwardRef((props, ref) => {
  const { className, isVisible, children, pathname } = props;

  if (!isVisible) return null;

  // const dispatch = useDispatch();

  // const navigate = useNavigate();

  let splittedPathname = pathname.split("/");
  let pathEnds = splittedPathname[splittedPathname.length - 1];

  const forwardAction = useMemo(() => {
    let action = null;
    switch (pathEnds) {
      case "test":
        action = null;
        break;
      case "addresses":
        action = null;
        break;
      case "possession":
        action = null;
        break;
      case "skills":
        action = null;
        break;
      default:
        action = null;
        break;
    }
    return action;
  }, [pathname]);

  const title = useMemo(() => {
    switch (pathEnds) {
      case "test":
        return 'Mes informations';
      case "addresses":
        return  "Mes adresses";
      case "addAddress":
        return 'Ajouter une addresse';
      case "possession":
				return "Mes propriétés";
      case "skills":
        return "Mes compétences recherchées"
      default:
        return '';
    }
	}, [pathname]);

  const backAction = useMemo(() => {
    let action = null;
    switch (pathEnds) {
      case "test":
        action = null;
        break;
      case "addresses":
        action = () => window.location.replace("/test");
        break;
      case "addAddress":
        action = () => window.location.replace("/test/addresses");
        break;
      case "possession":
        action = () => {};
        break;
      case "skills":
        action = () => {};
        break;
      case "calendar":
        action = () => window.location.replace("/test");
        break;
      default:
        action = () => {};
        break;
    }
    return action;
  }, [pathname]);

  // it would be time to do a nice stagger children here pour le coup;

  const initial = { opacity: 0.3, borderRadius: "0%" };
  const animate = { opacity: 1, borderRadius: "10%", transform: "scale(1.2)" };
  const transition = { duration: 0.5, ease: "easeInOut" };

  // do customized transition depending on usage;

  return (
    <motion.div
      // initial={initial}
      // animate={animate}
      // transition={transition}
      ref={ref}
      className={className}
    >
      <>
        <ModalNavigation title={title} onGoBack={backAction} onGoForward={forwardAction} />
        <div style={{ width: "100%" }}>{children}</div>
      </>
    </motion.div>
  );
});

export default ModalHome;
