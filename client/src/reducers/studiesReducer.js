import * as types from "../actions/actionTypes";

let initialState = {
    studies: [],
    selected: null
}

export default function studiesReducer(state = initialState, action) {
    let temp, index;
    switch (action.type) {
        case types.GET_STUDY_WITH_ID_SUCCESS:
            temp = [...state.studies];
            index = temp.findIndex(study => study.id === action.data.ID);
            if (index !== -1) {
                temp.splice(index, 1);
            }
            temp.push(action.data);
            const toReturn = { ...state, studies: temp }
            return toReturn;
        case types.SELECT_STUDY:
            return { ...state, selected: action.data }
        default:
            return state;
    }
}