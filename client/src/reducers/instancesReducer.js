import * as types from "../actions/actionTypes";
import * as constants from "../utils/constants";
import * as utils from "../utils/utils";

let initialState = {
    images: [],
    selected: null
}

export default function instancesReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_PATIENT_INSTANCES_SUCCESS:
            const toReturn = { ...state, images: action.data, selected: null }
            return toReturn;
        case types.SELECT_INSTANCE:
            let selectedInstance = state.images.filter(image => image.ID === action.data)[0];
            return { ...state, selected: selectedInstance }
        default:
            return state;
    }
}