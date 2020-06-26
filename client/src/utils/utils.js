import * as constants from "../utils/constants";

export function createImageUri(imageId) {
    let uri = `http://${constants.orhancIp}/orthanc/instances/${imageId}/file`;
    return "wadouri:" + uri;
}

export function formatPatientDataForTable(data) {

    let patients = [];

    for (let index = 0; index < data.length; index++) {
        const rowData = data[index];
        let patient = {
            id: rowData.ID,
            isStable: rowData.IsStable ? "Yes" : "No",
            lastUpdate: rowData.LastUpdate,
            birthDate: rowData.MainDicomTags.PatientBirthDate,
            patientId: rowData.MainDicomTags.PatientID,
            name: rowData.MainDicomTags.PatientName,
            sex: rowData.MainDicomTags.PatientSex,
            noOfStudies: rowData.Studies.length,
            studyId: rowData.Studies.length > 0 ? rowData.Studies[0] : "not set"
        }
        patients.push(patient);
    }

    return patients;
}