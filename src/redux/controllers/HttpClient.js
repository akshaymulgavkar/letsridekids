import axios from 'axios';

import { strings } from '../../Localization/Localization';
import { logout } from '../actions/User.Actions';
import { ApiEndPoints } from './ApiEndPoints';

let dispatch = null

export const setDispatch= RefDispatch=>{
    dispatch = RefDispatch;
    return null
}

const cancelToken = axios.CancelToken.source();

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 60000;
axios.defaults.cancelToken = cancelToken.token;
axios.defaults.baseURL='https://admin-lrk.letsridekids.com:3000'
// http://52.53.244.22:3000
axios.interceptors.response.use(
    (response) =>{ 
   return response.data},
    (error) => {
        console.log(error?.response,'error?.response')
        if (axios.isCancel(error)) {
            return Promise.reject(error)
        }
        if (error?.response) {
            if (error?.response?.status && error?.response?.status === 401) {
                if(dispatch){
                    dispatch(logout())
                return Promise.reject(new Error('Session Expired'))
                }
            }
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error.response.data.message))
            } else {
                return Promise.reject(new Error(error.response.data.error))
            }
        } else if (error?.request) {
            return Promise.reject(new Error(strings.common.connectionError));
        } else if (error?.message) {
            return Promise.reject(new Error(error.message.error));
        } else {
            return Promise.reject(new Error(strings.common.somethingWentWrong));
        }
    }
);

const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = `${token}`;
};

const clearAuthorization = () => {
    delete axios.defaults.headers.common['x-access-token'];
};

const cancelAll = () => { cancelToken.cancel() }

export const HttpClient = { ...axios, setAuthorization, clearAuthorization, cancelAll, ApiEndPoints };
