import config from '../config';

import * as constants from "../utils/constants";

import BackendService from "../services/BackendService";

const orthancBasePath = `${config.orthancURL}:${config.orthancPort}`;

class OrthancService {
    static getPatients() {
        const path = `${orthancBasePath}/${constants.patientsPath}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                let promises = [];
                for (let index = 0; index < result.length; index++) {
                    const id = result[index];
                    promises.push(OrthancService.getPatient(id));
                }

                Promise.all(promises).then(result => {
                    resolve(result);
                }, error => {
                    reject(error);
                });

            }, error => {
                reject(error);
            });
        });
    }

    static getPatient(id) {
        const path = `${orthancBasePath}/${constants.patientsPath}/${id}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getStudies() {
        const path = `${orthancBasePath}/${constants.studiesPath}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {

                let promises = [];
                for (let index = 0; index < result.length; index++) {
                    const id = result[index];
                    promises.push(OrthancService.getStudy(id));
                }

                Promise.all(promises).then(result => {
                    resolve(result);
                }, error => {
                    reject(error);
                });

            }, error => {
                reject(error);
            });
        });
    }

    static getStudy(id) {
        const path = `${orthancBasePath}/${constants.studiesPath}/${id}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getInstances(patientId) {
        const path = `${orthancBasePath}/${constants.patientsPath}/${patientId}/${constants.instancesPath}`;

        return new Promise((resolve, reject) => {
            BackendService.get(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }

    static getInstanceFile(instanceId) {
        const path = `${orthancBasePath}/${constants.instancesPath}/${instanceId}/file`;

        return new Promise((resolve, reject) => {
            BackendService.getRaw(path, result => {
                resolve(result);
            }, error => {
                reject(error);
            });
        });
    }
}

export default OrthancService;