export function createImageUri(imageId) {
    // let imageId = "http://localhost/orthanc/instances/7969c8f3-1ce35009-2ad17439-ba1e5e65-45b53bfb/file";
    // let imageId = "http://localhost:3001/api/instances/2a86f114-ecf83537-e4f14ab8-43119f54-a2315c2f/file";    
    let uri = `http://localhost/orthanc/instances/${imageId}/file`;
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