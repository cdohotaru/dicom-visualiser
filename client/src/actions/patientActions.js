import * as types from "./actionTypes";

import OrthancClient from "../services/OrthancClient";

export const getPatientIds = () => (dispatch) => {

    return OrthancClient.getPatients().then(result => {
        dispatch({
            type: types.GET_ALL_PATIENT_IDS_SUCCESS,
            data: result
        });
    }
    ).catch(error => {
        dispatch({
            type: types.GET_ALL_PATIENT_IDS_ERROR,
            data: error
        });
    });
}