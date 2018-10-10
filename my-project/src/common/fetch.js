import axios from 'axios'

const header = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Accept-Charset' : 'utf-8'
}

export default {
    get: (url, params = {}) =>{
        return axios.get(url, params, header).catch((err) =>{
            return { satusText: false, status: err.response.status}
        })
    },
    post: (url, params = {}) =>{
        return axios.post(url, params, header).catch((err) =>{
            return { statusText:false, status: err.response.status}
        })
    },
    put: (url, params = {}) => {
        return axios.put(url, params, header).catch((err) => {
            return { statusText: false, status: err.response.status };
        });
    },
    delete: (url, params = {}) => {
        return axios.delete(url, params, header).catch((err) => {
            return { statusText: false, status: err.response.status };
        });
    }

}