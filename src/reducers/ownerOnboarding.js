export function ownerOnBoarding (state = {
    onboardingModalOpen: false,
}, action) {
    switch (action) {
      case 'TOGGLE_MODAL': 
      return {
        ...state,
        onboardingModalOpen: action.onboardingModalOpen,
      }
    }
}