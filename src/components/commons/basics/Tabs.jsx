import React from "react"

import classNames from "classnames"

import { createUseStyles } from "react-jss"

const useStyles = createUseStyles((theme) => ({
  tabsRoot: {
    display: "flex",
    justifyContent: "space-around",
    padding: "0px 40px"
  },
  singleTab: {
    cursor: "pointer",
    borderBottom: "4px solid transparent",
    color: "white",
    padding: "8px 8px 8px 8px",
    cursor: "pointer",
    fontSize: 14
  },
  hoveredTab: {
    borderBottom: `4px solid ${theme.colors.blue.marineBlue}`
  },
  selectedTab: {
  }
}))

const Tabs = ({ tabs = [], selectedTabKey = null, hoveredTabKey, interactions }) => {

  const classes = useStyles()

  const { onHoverTab, onLeaveTab, onSelectTab } = interactions || {}

  if (!tabs || !tabs.length || !Array.isArray(tabs)) {
    return null
  }

  return (
    <div className={classes.tabsRoot}>{tabs.map(({ key, label }) => (
      <div
        className={classNames(classes.singleTab, { [classes.hoveredTab]: hoveredTabKey === key }, { [classes.selectedTab]: selectedTabKey === key })}
        onTouchStart={() => onHoverTab(key)}
        onMouseEnter={() => onHoverTab(key)}
        onTouchEnd={() => onLeaveTab(key)}
        onMouseLeave={() => onLeaveTab(key)}
        onClick={() => onSelectTab(key)}
      >
        {label}
      </div>
    ))} </div>
  )
}

export default Tabs