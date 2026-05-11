import React from "react"

import classNames from "classnames"

import { createUseStyles } from "react-jss"
import type { Theme } from "../../../styles/theme"

const useStyles = createUseStyles((theme: Theme) => ({
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
    fontSize: 14
  },
  hoveredTab: {
    borderBottom: `4px solid ${theme.colors.tide[300]}`
  },
  selectedTab: {
  }
}))

export interface Tab {
  key: string
  label: string
}

interface TabInteractions {
  onHoverTab: (key: string) => void
  onLeaveTab: (key?: string) => void
  onSelectTab: (key: string) => void
}

interface TabsProps {
  tabs?: Tab[]
  selectedTabKey?: string | null
  hoveredTabKey?: string | null
  interactions?: TabInteractions
}

const Tabs = ({ tabs = [], selectedTabKey = null, hoveredTabKey, interactions }: TabsProps) => {

  const classes = useStyles()

  const { onHoverTab, onLeaveTab, onSelectTab } = interactions || {}

  if (!tabs || !tabs.length || !Array.isArray(tabs)) {
    return null
  }

  return (
    <div className={classes.tabsRoot}>{tabs.map(({ key, label }) => (
      <div
        key={key}
        className={classNames(classes.singleTab, { [classes.hoveredTab]: hoveredTabKey === key }, { [classes.selectedTab]: selectedTabKey === key })}
        onTouchStart={() => onHoverTab?.(key)}
        onMouseEnter={() => onHoverTab?.(key)}
        onTouchEnd={() => onLeaveTab?.(key)}
        onMouseLeave={() => onLeaveTab?.(key)}
        onClick={() => onSelectTab?.(key)}
      >
        {label}
      </div>
    ))} </div>
  )
}

export default Tabs
