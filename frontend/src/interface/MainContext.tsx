import {IActivity} from "./IActivity.ts";
import {IBuddy} from "./IBuddy.ts";

export interface AppState {
    city: string;
    activities: IActivity[];
    buddy: IBuddy| null;
}

export type Action =
    { type: 'ADD_CITY', appState: AppState }
    | { type: 'UPDATE_CITY', appState: AppState }
    | { type: 'ADD_ACTIVITIES', appState: AppState }
    | { type: 'ADD_BUDDY', appState: AppState }
    | { type: 'UPDATE_BUDDY', appState: AppState };


//
// export type Action =
//     | { type: 'LOGIN'; user: string }
//     | { type: 'LOGOUT' };