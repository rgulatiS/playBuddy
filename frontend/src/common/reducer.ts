import {Action, AppState} from "../interface/MainContext";


export const initialState: AppState = {
    city: 'Delhi',
    activities: [],
    buddy: null,
};

export const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_CITY':
            return { ...state, city: 'Delhi' };
        case 'UPDATE_CITY':
            return { ...state, city: action.appState.city };
        case 'ADD_ACTIVITIES':
            return { ...state, activities: action.appState.activities };
        case 'ADD_BUDDY':
            return { ...state, buddy: action.appState.buddy };
        case 'UPDATE_BUDDY':
            return { ...state, buddy: action.appState.buddy };
        default:
            return state;
    }
};