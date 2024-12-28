import {Action, AppState} from "../interface/MainContext";


export const initialState: AppState = {
    city: 'Delhi',
};

export const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'CREATE':
            return { ...state, city: 'Delhi' };
        case 'UPDATE':
            return { ...state, city: action.appState.city };
        default:
            return state;
    }
};