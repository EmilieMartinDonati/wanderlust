import { createStore, applyMiddleware } from 'redux'
import type { Action } from 'redux'
import thunkMiddleware from 'redux-thunk'
import type { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../reducers'

export type { RootState } from '../reducers'
import type { RootState } from '../reducers'
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer)

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export default store
