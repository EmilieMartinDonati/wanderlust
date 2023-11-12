import React, { useState, useEffect, useMemo } from "react"

import HeaderCollapsedModal from "./HeaderCollapsedModal"
import Tabs from "../basics/Tabs"

import { createPortal } from "react-dom"
import FiltersSearchModal from "./mainHeaderModals/FiltersSearchModal"

export const HOST_TABS = []
export const OWNER_TABS = []

export const DEFAULT_TABS = [{
  key: "opportunities",
  label: "Opportunités de volontariat",
  redirectAction: null,
  modalContent: <FiltersSearchModal />
}, {
  key: "blog",
  label: " Blog de la communauté",
  redirectAction: null,
  modalContent: null,
}, {
  key: "discounts",
  label: "Nos réductions",
  redirectAction: null,
  modalContent: null
}]

const MainHeaderTabsContainer = ({ user = null }) => {

  const [selectedTabKey, setSelectedTabKey] = useState(null)
  const [hoveredTabKey, setHoveredTabKey] = useState(null)
  const [modalContent, setModalContent] = useState(null)

  const [modalOpen, setModalOpen] = useState(true)

  useEffect(() => {
    const selectedTab = [...DEFAULT_TABS, ...HOST_TABS, ...OWNER_TABS].find(({ key }) => key === selectedTabKey)
    if (selectedTab) {
      const { modalContent: selectedModalContent, redirectAction } = selectedTab
      if (selectedModalContent) {
        setModalOpen(true)
        setModalContent(selectedModalContent)
      }
      else {
        setModalContent(null)
        setModalOpen(false)
      }
      if (redirectAction) {
        redirectAction()
      }
    }
    else {
      setModalContent(null)
      setModalOpen(false)
    }
  }, [selectedTabKey])

  const onSelectTab = (tabValue) => {
    const currentTabValue = selectedTabKey
    if (tabValue === currentTabValue) {
      setSelectedTabKey(null)
    }
    else {
      setSelectedTabKey(tabValue)
    }
  }

  const onHoverTab = (tabValue) => setHoveredTabKey(tabValue)
  const onLeaveTab = () => setHoveredTabKey(null)

  const tabsOptions = useMemo(() => {
    if (!user) return DEFAULT_TABS
    else {
      if (user.isHost) return HOST_TABS
      else return DEFAULT_TABS
    }
  }, [user])

  return <div>
    <Tabs
      tabs={tabsOptions}
      selectedTabKey={selectedTabKey}
      hoveredTabKey={hoveredTabKey}
      interactions={{
        onSelectTab,
        onHoverTab,
        onLeaveTab
      }} />
    {modalContent && createPortal(<HeaderCollapsedModal
      modalContent={modalContent}
      open={modalOpen}
      onClose={() => {
        setModalOpen(false)
        setSelectedTabKey(null)
      }}
      onConfirm={() => console.log("TODO SUBMIT FORM")}

    />, document.body)}
  </div>

}

export default MainHeaderTabsContainer
