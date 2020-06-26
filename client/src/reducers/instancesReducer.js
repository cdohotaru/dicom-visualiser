import * as types from "../actions/actionTypes";
import * as constants from "../utils/constants";
import * as utils from "../utils/utils";

let initialState = {
    instances: [],
    selected: null
}

export default function instancesReducer(state = initialState, action) {
    let temp, index;
    switch (action.type) {
        case types.GET_PATIENT_INSTANCES_SUCCESS:
            temp = [...action.data];

            return {
                ...temp, selected: null
            };
        default:
            return state;
    }
}