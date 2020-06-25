import BackendService from "../services/BackendService";
import * as constants from "../utils/constants";

class OrthancClient {
    static getPatients() {
        return new Promise((resolve, reject) => {
            BackendService.get(constants.patientsPath, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getPatientInstances(id) {
        const path = `${constants.patientsPath}/${id}/${constants.instancesPath}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getStudy(id) {
        const path = `${constants.studiesPath}/${id}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getInstanceFile(id) {
        const path = `${constants.instancesPath}/${id}/file`;

        return new Promise((resolve, reject) => {
            BackendService.getRaw(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }
}

export default OrthancClient;