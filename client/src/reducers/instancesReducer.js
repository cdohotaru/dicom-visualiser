import * as types from "../actions/actionTypes";
import * as constants from "../utils/constants";
import * as utils from "../utils/utils";

let initialState = {
    images: [],
    selected: null
}

export default function instancesReducer(state = initialState, action) {
    let temp, index;
    switch (action.type) {
        case types.GET_PATIENT_INSTANCES_SUCCESS:
            const toReturn = { ...state, images: action.data }
            return toReturn;
        default:
            return state;
    }
}