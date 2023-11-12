
function actionsApp (state = {
    isDay: true,
    location: 'beginning',
    score: 0,
    life: 100,
    isProfileModalOpen: false,
  }, action) {
    switch(action.type) {
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


export function getLocation(state) {
  return state.location;
}

export function isDay(state) {
    return state.isDay;
} 

export function isNight(state) {
    return state.isNight;
}

export default actionsApp;