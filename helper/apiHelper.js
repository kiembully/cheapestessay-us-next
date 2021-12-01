import axios from 'axios';
import Router from "next/router";

// let url = "https://e6djdtoi97.execute-api.us-east-2.amazonaws.com/dev/";
let url = "https://web.cheapestessay.com/";

// api calling function
export const apiHelper = (api, method, data, headers) => {
    const apiUrl = url + api;
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: apiUrl,
            data: data,
            headers: headers
        })
            .then(res => resolve(res))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Router.push('/login');
                } else {
                    reject(error);
                }
            });
    });
}

// api calling function
export const ukApiHelper = (api, method, data, headers) => {
    const apiUrl = url + 'us/' + api;
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: apiUrl,
            data: data,
            headers: headers
        })
            .then(res => resolve(res))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Router.push('/login');
                } else {
                    reject(error);
                }
            });
    });
}