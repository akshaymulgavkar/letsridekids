import { ApiEndPoints } from "./ApiEndPoints";
import { HttpClient } from "./HttpClient";

export class PublishRideController{

    static publishRides(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.PUBLISHRIDES, params,{cancelToken:cancelToken})
            .then(response=>{
                resolve(response);
            }).catch(e =>{
                reject(e);
            })
        })
    }

    static editRides(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.EDITPOSTEDRIDE, params, {cancelToken:cancelToken})
            .then(response=>{
                resolve(response);
            }).catch(e =>{
                reject(e);
            })
        })
    }
}