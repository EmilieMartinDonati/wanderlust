import { createPortal } from "react-dom";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";


import {useDispatch} from 'react-redux';


const useStyles = createUseStyles({
   root: {
    width: '100vw',
    minHeight: "100vh",
    position: 'fixed', 
    top: 100,
    zIndex: 1000,
   },
   overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: '100vw',
    minHeight: "100vh",
    pointerEvents: "auto",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden',
   },
   modal: {
    width: 500,
    border: '2px red solid',
    backgroundColor: 'white',
    height: '100vh',
   }
})


const MonitoringModal = ({isVisible = true, name = 'properties'}) => {

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // return ()=> document.body.style.overflow = 'unset';
 }, []);

  if (!isVisible) return null;

  const _closeModal = () => {dispatch({type: 'TOGGLE_MONITORING_MODAL', isMonitoringModalOpen: false})};

  return (
  <div className={classes.root}>
  <div className={classes.overlay} onClick={_closeModal}>
    <div className={classes.modal} onClick={e => e.stopPropagation()}/>
  </div>
  </div>)
}

export default MonitoringModal;