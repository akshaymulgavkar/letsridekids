import { ApiEndPoints } from "./ApiEndPoints";
import { HttpClient } from "./HttpClient";

export class ProfileController{

    static ChangePassword(params, cancelToken){
        return new Promise((resolve, reject) => {
            HttpClient.put(ApiEndPoints.CHANGEPASSWORD, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        }); 
    }

    static VerifyMobileOtp(params, cancelToken){
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.VERIFYMOBILEOTP, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {

                    reject(e);
                })
        }); 
    }

    static VerifyMobile(params, cancelToken){
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.VERIFYMOBILE, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        }); 
    }

    static EditProfile(data, cancelToken){
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.UPDATEPROFILE, data, {cancelToken:cancelToken,headers:{
                'Content-Type': 'multipart/form-data'
            }})
                .then(response => {

                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        }); 
    }

    static AddVehicleDetails(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.put(ApiEndPoints.ADDVEHICLEDETAILS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }
    static VerifyDrivingLisence(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.VERIFYDL,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }
    static SendNotification(params){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.SENDNOTIFICATION+params?.id+'&rideId='+params?.rideId+'&userId='+params?.userId,params)
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static toggleNotification(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.NOTIFICATIONPERMISSION, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static getSinglePostedRide(params) {
        return new Promise((resolve, reject) => {
            HttpClient.get(ApiEndPoints.GETSINGLEPOSTEDRIDE+params?.rideId, params)
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    console.log({e}, 'getSinglePosted error')
                    reject(e);
                })
        });
    }

    static getSingleBookedRide(params) {
        return new Promise((resolve, reject) => {
            HttpClient.get(ApiEndPoints.GETSINGLEBOOKEDRIDE+params?.rideId+'&userId='+params?.userId)
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    console.log({e}, 'getSinglePosted error')
                    reject(e);
                })
        });
    }

    static rideShareApi(params){
        return new Promise((resolve, reject)=>{
            HttpClient.get(ApiEndPoints.RIDESHAREAPI+params?.id+'/'+params?.date)
            .then(response => {
                resolve(response);
            }).catch(e => {
                console.log({e}, 'share Ride error', e?.message)
                reject(e);
            })
        })
    }
}

