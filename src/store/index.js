
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

 function ownerOnBoarding (state = {
    onboardingModalOpen: true,
}, action) {
    switch (action.type) {
      case 'TOGGLE_OWNER_MODAL': 
      return {
        ...state,
        onboardingModalOpen: action.onboardingModalOpen,
      }
      default :
      return state;
    }
}

export function isOnboardingModalOpen(state) {
    return state.ownerOnBoarding.onboardingModalOpen;
}


function actionsApp (state = {
    currentUser: null,
    isDay: true,
    location: 'beginning',
    score: 0,
    life: 100,
    isProfileModalOpen: false,
  }, action) {
    switch(action.type) {
        case "CURRENT_USER_LOADED" : 
        return {
            ...state,
            currentUser: action.currentUser,
        }
        case "switchMode":
        return {
            ...state,
            isDay: !state.isDay,
        };
        case "changeLoc":
            return {
                ...state,
                location: action.location,
            };
        case "addPoint":
            return {
                ...state,
                score: state.score + 1,
            }
        case "suffer":
            return {
                ...state,
                life: state.life - 1,
            }
        case 'toggleModal': 
        return {
            ...state,
            isProfileModalOpen: !state.isProfileModalOpen
        }
        default: 
        return state;
    }
}

function administrationState(state = {
   selectedProperty: null,
   isMonitoringModalOpen: false,
}, action) {
    switch (action.type) {
        case 'PROPERTY_LOADED_FOR_MODAL': 
        return {...state, selectedProperty:  action.selectedProperty};
        case 'PROPERTY_UNLOADED_FOR_MODAL': 
        return {...state, selectedProperty: null};
        case 'TOGGLE_MONITORING_MODAL':
        return {...state, isMonitoringModalOpen: action.isMonitoringModalOpen}
        default:
        return state;
    }
}


export function getLocation(state) {
  return state.actionsApp.location;
}

export function isDay(state) {
    return state.actionsApp.isDay;
} 

export function isNight(state) {
    return state.actionsApp.isNight;
}

export function getCurrentUser(state) {
    return state.actionsApp?.currentUser;
}


/** administration  */

export function getSelectedProperty (state) {
    return state.administrationState?.selectedProperty;
}
export function getIsMonitoringModalOpen(state) {
    return state.administrationState?.isMonitoringModalOpen;
}

const rootReducer = combineReducers({
  actionsApp, ownerOnBoarding, administrationState,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
  
const store = createStore(rootReducer, composedEnhancer);

export default store;