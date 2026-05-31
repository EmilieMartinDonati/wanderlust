import { AppDispatch } from "../store"

export const toggleOnBoardingModal = (open = true) => {
  return (dispatch:AppDispatch, getState) => {
   dispatch({
    type: "TOGGLE_OWNER_MODAL",
    onboardingModalOpen: open,
  })
 }
}