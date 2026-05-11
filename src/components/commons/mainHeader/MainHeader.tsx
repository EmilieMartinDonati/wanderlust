import React from "react"
import { useAppSelector } from "../../../store/hook";
import { createUseStyles } from "react-jss";
import type { Theme } from "../../../styles/theme";

export const HEADER_HEIGHT = 200

import MainHeaderMenu from "./MainHeaderMenu";
import MainHeaderTabsContainer from "./MainHeaderTabsContainer";

import { getCurrentUser } from "../../../reducers/app";

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: theme.zIndexes.mainHeader,
    backgroundColor: theme.colors.tide[500]
  },
}));

interface MainHeaderProps {
  toggleModal: () => void
}

const MainHeader = ({ toggleModal }: MainHeaderProps) => {
  const user = useAppSelector(getCurrentUser)
  const classes = useStyles()

  return (<div className={classes.header}>
    <MainHeaderMenu onRegister={toggleModal}/>
    <MainHeaderTabsContainer user={user} />
  </div>)

}

export default MainHeader
