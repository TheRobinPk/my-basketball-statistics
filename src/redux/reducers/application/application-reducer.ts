import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Database} from "expo-sqlite";

export interface ApplicationInitializer {}

export interface ApplicationState {
    applicationInitialized: boolean;
    database?: Database;
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    database: undefined
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        initializeApplication: (state) => {
            state.applicationInitialized = true;
        },
        setApplicationDatabase: (state, action: PayloadAction<Database>) => {
            state.database = action.payload;
        }
    }
});

const applicationReducer = applicationSlice.reducer;

export const {
    initializeApplication,
    setApplicationDatabase,
} = applicationSlice.actions;
export const applicationMounted = createAction('application/applicationMounted');
export default applicationReducer;