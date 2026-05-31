import type { RootState } from './index'

type AdministrationState = {
  selectedProperty: string | null
  isMonitoringModalOpen: boolean
}

type AdministrationAction =
  | { type: 'PROPERTY_LOADED_FOR_MODAL'; selectedProperty: string }
  | { type: 'PROPERTY_UNLOADED_FOR_MODAL' }
  | { type: 'TOGGLE_MONITORING_MODAL'; isMonitoringModalOpen: boolean }

const initialState: AdministrationState = {
  selectedProperty: null,
  isMonitoringModalOpen: false,
}

function administrationState(
  state: AdministrationState = initialState,
  action: AdministrationAction
): AdministrationState {
  switch (action.type) {
    case 'PROPERTY_LOADED_FOR_MODAL':
      return { ...state, selectedProperty: action.selectedProperty }
    case 'PROPERTY_UNLOADED_FOR_MODAL':
      return { ...state, selectedProperty: null }
    case 'TOGGLE_MONITORING_MODAL':
      return { ...state, isMonitoringModalOpen: action.isMonitoringModalOpen }
    default:
      return state
  }
}

// Selectors
export const getSelectedProperty       = (state: RootState) => state.administrationState.selectedProperty
export const getIsMonitoringModalOpen  = (state: RootState) => state.administrationState.isMonitoringModalOpen

export default administrationState
