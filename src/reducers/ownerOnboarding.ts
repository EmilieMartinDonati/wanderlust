import type { RootState } from './index'

type OwnerOnboardingState = {
  onboardingModalOpen: boolean
}

type OwnerOnboardingAction =
  | { type: 'TOGGLE_OWNER_MODAL'; onboardingModalOpen: boolean }

const initialState: OwnerOnboardingState = {
  onboardingModalOpen: true,
}

function ownerOnBoarding(
  state: OwnerOnboardingState = initialState,
  action: OwnerOnboardingAction
): OwnerOnboardingState {
  switch (action.type) {
    case 'TOGGLE_OWNER_MODAL':
      return { ...state, onboardingModalOpen: action.onboardingModalOpen }
    default:
      return state
  }
}

// Selectors
export const isOnboardingModalOpen = (state: RootState) => state.ownerOnBoarding.onboardingModalOpen

export default ownerOnBoarding
