import { combineReducers } from "redux";

import * as actionTypes from "../actions/actionTypes";

import patients from "./patientsReducer";
import studies from "./studiesReducer";

export default function createReducer() {
    const combinedReducers = combineReducers({
        patients,
        studies
    });

    return (state, action) => {
        if (action.type === actionTypes.CLEAR_STORE_REQUEST) {
            const { routing } = state;
            state = { routing };
        }

        return combinedReducers(state, action);
    };
}