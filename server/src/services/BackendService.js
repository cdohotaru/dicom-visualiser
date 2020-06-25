import request from "superagent";

class BackendService {

    static _isSuccessStatusCode(statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }

    static get(url, resolve, reject, query) {
        request.get(url)
            .set({ "Accept": "application/json", "Content-Type": "application/json" })
            .query(query)
            .then((response) => {
                if (response && response.status === undefined) {
                    return reject({ statusCode: 500 });
                }
                if (BackendService._isSuccessStatusCode(response.status)) {
                    if (response.body) {
                        return resolve(response.body);
                    } else {
                        return resolve(response.statusCode);
                    }
                }
                return reject(response.body ? response.body : response);
            }).catch(error => {
                return reject(error.response.body ? error.response.body : error.response);
            });
    }

    static getRaw(url, resolve, reject, query) {
        request.get(url)
            .query(query)
            .then((response) => {
                if (response && response.status === undefined) {
                    return reject({ statusCode: 500 });
                }
                if (BackendService._isSuccessStatusCode(response.status)) {
                    if (response.body) {
                        return resolve(response.body);
                    } else {
                        return resolve(response.statusCode);
                    }
                }
                return reject(response.body ? response.body : response);
            }).catch(error => {
                return reject(error.response.body ? error.response.body : error.response);
            });
    }
}

export default BackendService;