import * as constants from "../utils/constants";

class BackendService {

    static async get(path, resolve, reject) {
        const url = `${constants.baseServerUrl}/${path}`;

        try {
            const response = await fetch(url, {
                method: "get",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                })
            });
            const json = await response.json();
            resolve(json);
        } catch (error) {
            reject(error);
        }
    }

    static async getDicom(path, resolve, reject) {
        const url = `${constants.baseServerUrl}/${path}`;

        try {
            const response = await fetch(url, {
                method: "get",
            });
            const body = await response.body();
            resolve(body);
        } catch (error) {
            reject(error);
        }
    }

    static async post(path) {
        const url = `${constants.baseServerUrl}/${path}`;
        const response = await fetch(url, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            })
        });
        const json = await response.json();
        return json;
    }
}

export default BackendService;