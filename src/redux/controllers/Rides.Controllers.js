import { ApiEndPoints } from "./ApiEndPoints";
import { HttpClient } from "./HttpClient";

export class RidesController {

    static getPublishedRides(params, cancelToken){
        return new Promise((resolve, reject)=>{

            HttpClient.get(ApiEndPoints.GETPUBLISHEDRIDES+params.userId,{cancelToken:cancelToken})
            .then(response => {
                resolve(response?.data);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static getBookedRides(){
        return new Promise((resolve, reject)=>{
            HttpClient.get(ApiEndPoints.GETBOOKEDRIDES)
            .then(response => {
                resolve(response?.data);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static cancelRide(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.CANCELRIDE,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static deletePostedRide(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.DELETEPOSTEDRIDE,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static changeRideStatus(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.RIDESTATUS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static rateDriverToPassengers(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.RATEDRIVERTOPASSENGERS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static getBookingDetails(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.GETBOOKINGDETAILS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static getPassengerDetails(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.GETPASSENGERDETAILS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static getRidesStatus(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.GETRIDESSTATUS,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }
    static passengerRating(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.PASSENGERRATING,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }

    static bookingPermission(params, cancelToken){
        return new Promise((resolve, reject)=>{
            HttpClient.post(ApiEndPoints.BOOKINGPERMISSION,params, {cancelToken:cancelToken})
            .then(response => {
                resolve(response);
            }).catch(e=>{
                reject(e)
            })
        })
    }
}