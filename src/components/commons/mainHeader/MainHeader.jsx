import React from "react"
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";

export const HEADER_HEIGHT = 200

import MainHeaderMenu from "./MainHeaderMenu";
import MainHeaderTabsContainer from "./MainHeaderTabsContainer";
import { getCurrentUser } from "../../../store";

const useStyles = createUseStyles((theme) => ({
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: theme.zIndexes.mainHeader,
    backgroundColor: theme.colors.blue.primary
  },
}));

const MainHeader = () => {
  const user = useSelector(getCurrentUser)
  const classes = useStyles()

  return (<div className={classes.header}>
    <MainHeaderMenu />
    <MainHeaderTabsContainer user={user} />
  </div>)
  
}

export default MainHeader