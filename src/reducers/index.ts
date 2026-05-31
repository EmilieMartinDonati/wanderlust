import { combineReducers } from 'redux'
import actionsApp from './app'
import ownerOnBoarding from './ownerOnboarding'
import administrationState from './administration'

export const rootReducer = combineReducers({
  actionsApp,
  ownerOnBoarding,
  administrationState,
})

export type RootState = ReturnType<typeof rootReducer>
