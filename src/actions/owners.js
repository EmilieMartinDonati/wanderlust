export const toggleOnBoardingModal = (open = true) => {
  return (dispatch, getState) => {
   dispatch({
    type: "TOGGLE_OWNER_MODAL",
    onboardingModalOpen: open,
  })
 }
}