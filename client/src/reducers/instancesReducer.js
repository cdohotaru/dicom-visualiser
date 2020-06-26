import * as types from "../actions/actionTypes";

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