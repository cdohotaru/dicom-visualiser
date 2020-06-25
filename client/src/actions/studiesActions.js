import * as types from "./actionTypes";

import OrthancClient from "../services/OrthancClient";

export const getStudyWithId = (id) => (dispatch) => {

    OrthancClient.getStudy(id).then(
        result => {
            dispatch({
                type: types.GET_STUDY_WITH_ID_SUCCESS,
                data: result
            });
        }
    ).catch(error => {
        dispatch({
            type: types.GET_STUDY_WITH_ID_ERROR,
            data: error
        });
    });
}

export const selectStudy = (id) => (dispatch) => {
    dispatch({
        type: types.SELECT_STUDY,
        data: id
    });
}