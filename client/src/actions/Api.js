class Api {
    constructor(name, url, headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }) {
        this.API_SUCCESS = `${name}_API_SUCCESS`;
        this.API_ERROR = `${name}_API_ERROR`;
        this.API_PENDING = `${name}_API_PENDING`;
        this.URL = url;
        this.headers = headers;
    }

    request = async (path = '', options) => (dispatch) => {
        dispatch({ type: this.API_PENDING });
        try {
            fetch(`${this.URL}/${path}`, options).then(data => dispatch({ type: this.API_SUCCESS, data }));
        } catch (error) {
            dispatch({ type: this.API_ERROR, error });
        }
    }

    get(path) {
        return this.request(path, { method: 'GET', headers: this.headers });
    }

    post(path, body) {
        return this.request(path, { method: 'POST', body, headers: this.headers });
    }

    put(path, body) {
        return this.request(path, { method: 'PUT', body, headers: this.headers });
    }

    delete(path) {
        return this.request(path, { method: 'DELETE', headers: this.headers });
    }
}

export default Api;
