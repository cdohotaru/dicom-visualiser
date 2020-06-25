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

export const getPatientWithId = (id) => (dispatch) => {

    OrthancClient.getPatient(id).then(
        result => {
            dispatch({
                type: types.GET_PATIENT_WITH_ID_SUCCESS,
                data: result
            });
        }
    ).catch(error => {
        dispatch({
            type: types.GET_PATIENT_WITH_ID_ERROR,
            data: error
        });
    });
}