import * as types from "../actions/actionTypes";
import * as utils from "../utils/utils";

export default function patientsReducer(state = [], action) {
    let temp, index;
    switch (action.type) {
        case types.GET_ALL_PATIENT_IDS_SUCCESS:
            let transformed = [];
            if (action.data && action.data.length > 0) {
                transformed = utils.formatPatientDataForTable(action.data);
            }
            return transformed;
        case types.GET_PATIENT_WITH_ID_SUCCESS:
            temp = [...state.patients];
            index = temp.findIndex(patient => patient.id === action.data.id);
            if (index !== -1) {
                temp.splice(index, 1);
            }
            temp.push(action.data);
            return {
                ...temp
            };
        default:
            return state;
    }
}