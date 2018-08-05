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

    async request(path = '', options, dispatch) {
        dispatch({ type: this.API_PENDING });
        try {
            return fetch(`${this.URL}/${path}`, options)
                .then(res => res.json())
                .then(data => dispatch({ type: this.API_SUCCESS, data }));
        } catch (error) {
            return dispatch({ type: this.API_ERROR, error });
        }
    }

    get(path) {
        return dispatch => this.request(path, { method: 'GET', headers: this.headers }, dispatch);
    }

    post(path, body) {
        return dispatch => this.request(path, { method: 'POST', body: JSON.stringify(body), headers: this.headers }, dispatch);
    }

    put(path, body) {
        return dispatch => this.request(path, { method: 'PUT', body: JSON.stringify(body), headers: this.headers }, dispatch);
    }

    delete(path) {
        return dispatch => this.request(path, { method: 'DELETE', headers: this.headers }, dispatch);
    }
}

export default Api;
