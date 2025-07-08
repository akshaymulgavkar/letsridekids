import { ApiEndPoints } from "./ApiEndPoints";
import { HttpClient } from "./HttpClient";

export class SearchRideController{

    static searchRides(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.SEARCHRIDES, params)
            .then(response=>{
                resolve(response.data);
            }).catch(e =>{
                reject(e);
            })
        })
    }

    static bookRides(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.BOOKRIDES, params)
            .then(response=>{
                resolve(response);
            }).catch(e =>{
                reject(e);
            })
        })
    }

    static getDatesDetails(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.get(ApiEndPoints.GETDATESDETAILS + params.id + '/' + params.currentDate)
            .then(response=>{
                resolve(response);
            }).catch(e =>{
                reject(e);
            })
        })
    }
}