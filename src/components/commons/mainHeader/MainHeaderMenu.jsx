import React from "react"

import { createUseStyles } from "react-jss"

import WanderLustLogo from "../../../public/images/logos/wanderlust_logo.png"

import { Link } from "react-router-dom"

const useStyles = createUseStyles((theme) => ({
  mainHeaderMenuRoot: {
    display: "flex",
    alignItems: "stretch",
    padding: "8px 20px 0px 20px",
    borderBottom: `1px solid ${theme.colors.green.petulant}`
  },
  leftMenu: {
    display: "flex",
    justifyContent: 'space-evenly',
    alignItems: "center",
    flexGrow: 1,
    gap: "4px"
  },
  centralContent: {
    flexBasis: "50%",
  },
  logo: {
    height: 100,
    width: 130
  },
  rightMenu: {
    display: "flex",
    justifyContent: 'space-evenly',
    alignItems: "center",
    flexGrow: 1,
    gap: "4px"
  },
  menuAction: {
    color: "white",
    minHeight: "51px",
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    padding: "4px",
    letterSpacing: 0.2,
    textUnderlineOffset: "2px",
    textDecoration: "none",
    cursor: "pointer",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textCecoration: "none"
    },
    "&:hover": {
      background: theme.colors.blue.marineBlue
    }
  }
}))

const MainHeaderMenu = () => {

  const classes = useStyles()

  return (
    <div className={classes.mainHeaderMenuRoot}>
      <div className={classes.leftMenu}>
        <Link className={classes.menuAction}
          to="/">
          Aide
        </Link>
        <Link className={classes.menuAction}
          to="/">
          Notre fonctionnement
        </Link>
        <Link className={classes.menuAction}
          to="/">
          Langue
        </Link>
      </div>
      <div className={classes.centralContent}><img className={classes.logo} src={WanderLustLogo} alt="WanderLust Logo" /></div>
      <div className={classes.rightMenu}>
        <Link className={classes.menuAction}
          to="/">
          S'inscrire
        </Link>
        <Link className={classes.menuAction}
          to="/">
          Se connecter
        </Link>
        <Link className={classes.menuAction}
          to="/">
          Se déconnecter
        </Link>
      </div>
    </div>
  )

}

export default MainHeaderMenu