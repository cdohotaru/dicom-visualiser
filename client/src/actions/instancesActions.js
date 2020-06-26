import * as types from "./actionTypes";

import OrthancClient from "../services/OrthancClient";

export const getInstancesForPatientId = (patientId) => (dispatch) => {

    OrthancClient.getPatientInstances(patientId).then(
        result => {
            dispatch({
                type: types.GET_PATIENT_INSTANCES_SUCCESS,
                data: result
            });
        }
    ).catch(error => {
        dispatch({
            type: types.GET_PATIENT_INSTANCES_ERROR,
            data: error
        });
    });
}