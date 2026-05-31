import type { RootState } from './index'
import type { User } from '../types'

type AppState = {
  currentUser: User | null
  isDay: boolean
  location: string
  score: number
  life: number
  isProfileModalOpen: boolean
}

type AppAction =
  | { type: 'CURRENT_USER_LOADED'; currentUser: User }
  | { type: 'switchMode' }
  | { type: 'changeLoc'; location: string }
  | { type: 'addPoint' }
  | { type: 'suffer' }
  | { type: 'toggleModal' }

const initialState: AppState = {
  currentUser: null,
  isDay: true,
  location: 'beginning',
  score: 0,
  life: 100,
  isProfileModalOpen: false,
}

function actionsApp(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case 'CURRENT_USER_LOADED':
      return { ...state, currentUser: action.currentUser }
    case 'switchMode':
      return { ...state, isDay: !state.isDay }
    case 'changeLoc':
      return { ...state, location: action.location }
    case 'addPoint':
      return { ...state, score: state.score + 1 }
    case 'suffer':
      return { ...state, life: state.life - 1 }
    case 'toggleModal':
      return { ...state, isProfileModalOpen: !state.isProfileModalOpen }
    default:
      return state
  }
}

// Selectors
export const getLocation         = (state: RootState) => state.actionsApp.location
export const isDay               = (state: RootState) => state.actionsApp.isDay
export const isNight             = (state: RootState) => !state.actionsApp.isDay
export const getCurrentUser      = (state: RootState) => state.actionsApp.currentUser
export const getIsProfileModalOpen = (state: RootState) => state.actionsApp.isProfileModalOpen

export default actionsApp
