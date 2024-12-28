export interface AppState {
    city: string;
}

export type Action =
    { type: 'CREATE', appState: AppState }
    | { type: 'DELETE' , appState: AppState}
    | { type: 'UPDATE' , appState: AppState};


//
// export type Action =
//     | { type: 'LOGIN'; user: string }
//     | { type: 'LOGOUT' };