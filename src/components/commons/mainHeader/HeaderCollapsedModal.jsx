import React, { useState } from "react"
import Button from "../Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  collapsedModalRoot: {
    position: "fixed",
    padding: "20px",
    top: 149,
    width: "100vw",
    height: "auto",
    background: "white",
    zIndex: 300
  }
}))

const HeaderCollapsedModal = ({ modalContent, open = true, onClose }) => {

  const classes = useStyles()

  if (!modalContent || !open) return null

  return <div className={classes.collapsedModalRoot} >
    {modalContent}
    <Button onClick={onClose}>Fermer</Button>
  </div>

}

export default HeaderCollapsedModal