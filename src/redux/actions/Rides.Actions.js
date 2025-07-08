import { RidesController } from "../controllers/Rides.Controllers";
import { DropDownHolder } from "../../utils/DropDownHolder";

export const TYPES ={
    GET_PUBLISHED_RIDES:'GET_PUBLISHED_RIDES',
    GET_PUBLISHED_RIDES_REQUEST:'GET_PUBLISHED_RIDES_REQUEST',
    GET_PUBLISHED_RIDES_SUCCESS:'GET_PUBLISHED_RIDES_SUCCESS',
    GET_PUBLISHED_RIDES_ERROR:'GET_PUBLISHED_RIDES_ERROR',
    
    GET_BOOKED_RIDES:'GET_BOOKED_RIDES',
    GET_BOOKED_RIDES_REQUEST:'GET_BOOKED_RIDES_REQUEST',
    GET_BOOKED_RIDES_SUCCESS:'GET_BOOKED_RIDES_SUCCESS',
    GET_BOOKED_RIDES_ERROR:'GET_BOOKED_RIDES_ERROR',
   
    DELETE_POSTED_RIDE:'DELETE_POSTED_RIDE',
    DELETE_POSTED_RIDE_REQUEST:'DELETE_POSTED_RIDE_REQUEST',
    DELETE_POSTED_RIDE_SUCCESS:'DELETE_POSTED_RIDE_SUCCESS',
    DELETE_POSTED_RIDE_ERROR:'DELETE_POSTED_RIDE_ERROR',

    CHANGE_RIDE_STATUS:'CHANGE_RIDE_STATUS',
    CHANGE_RIDE_STATUS_REQUEST:'CHANGE_RIDE_STATUS_REQUEST',
    CHANGE_RIDE_STATUS_SUCCESS:'CHANGE_RIDE_STATUS_SUCCESS',
    CHANGE_RIDE_STATUS_ERROR:'CHANGE_RIDE_STATUS_ERROR',

    RATE_DRIVER_TO_PASSENGERS:'RATE_DRIVER_TO_PASSENGERS',
    RATE_DRIVER_TO_PASSENGERS_REQUEST:'RATE_DRIVER_TO_PASSENGERS_REQUEST',
    RATE_DRIVER_TO_PASSENGERS_SUCCESS:'RATE_DRIVER_TO_PASSENGERS_SUCCESS',
    RATE_DRIVER_TO_PASSENGERS_ERROR:'RATE_DRIVER_TO_PASSENGERS_ERROR',

    GET_BOOKING_DETAILS:'GET_BOOKING_DETAILS',
    GET_BOOKING_DETAILS_REQUEST:'GET_BOOKING_DETAILS_REQUEST',
    GET_BOOKING_DETAILS_SUCCESS:'GET_BOOKING_DETAILS_SUCCESS',
    GET_BOOKING_DETAILS_ERROR:'GET_BOOKING_DETAILS_ERROR',

    GET_PASSENGER_DETAILS:'GET_PASSENGER_DETAILS',
    GET_PASSENGER_DETAILS_REQUEST:'GET_PASSENGER_DETAILS_REQUEST',
    GET_PASSENGER_DETAILS_SUCCESS:'GET_PASSENGER_DETAILS_SUCCESS',
    GET_PASSENGER_DETAILS_ERROR:'GET_PASSENGER_DETAILS_ERROR',

    GET_RIDES_STATUS:'GET_RIDES_STATUS',
    GET_RIDES_STATUS_REQUEST:'GET_RIDES_STATUS_REQUEST',
    GET_RIDES_STATUS_SUCCESS:'GET_RIDES_STATUS_SUCCESS',
    GET_RIDES_STATUS_ERROR:'GET_RIDES_STATUS_ERROR',

    PASSENGER_RATING:'PASSENGER_RATING',
    PASSENGER_RATING_REQUEST:'PASSENGER_RATING_REQUEST',
    PASSENGER_RATING_SUCCESS:'PASSENGER_RATING_SUCCESS',
    PASSENGER_RATING_ERROR:'PASSENGER_RATING_ERROR',

    CANCEL_BOOKED_RIDE:'CANCEL_BOOKED_RIDE',
    CANCEL_BOOKED_RIDE_REQUEST:'CANCEL_BOOKED_RIDE_REQUEST',
    CANCEL_BOOKED_RIDE_SUCCESS:'CANCEL_BOOKED_RIDE_SUCCESS',
    CANCEL_BOOKED_RIDE_ERROR:'CANCEL_BOOKED_RIDE_ERROR',

    BOOKING_PERMISSION:'BOOKING_PERMISSION',
    BOOKING_PERMISSION_REQUEST:'BOOKING_PERMISSION_REQUEST',
    BOOKING_PERMISSION_SUCCESS:'BOOKING_PERMISSION_SUCCESS',
    BOOKING_PERMISSION_ERROR:'BOOKING_PERMISSION_ERROR'
}

const getPublishRidesRequest =()=>({
    type:TYPES.GET_PUBLISHED_RIDES_REQUEST,
    payload:null
})

const getPublishRidesSuccess =publishedRides=>({
    type:TYPES.GET_PUBLISHED_RIDES_SUCCESS,
    payload:{publishedRides}
})

const getPublishRidesError = (error) =>({
    type:TYPES.GET_PUBLISHED_RIDES_ERROR,
    payload:error
})

const cancelBookedRideRequest =()=>({
    type:TYPES.CANCEL_BOOKED_RIDE_REQUEST,
    payload:null
})

const cancelBookedRideSuccess =cancelRide=>({
    type:TYPES.CANCEL_BOOKED_RIDE_SUCCESS,
    payload:{cancelRide}
})

const cancelBookedRideError = (error) =>({
    type:TYPES.CANCEL_BOOKED_RIDE_ERROR,
    payload:error
})

const getBookedRidesRequest =()=>({
    type:TYPES.GET_BOOKED_RIDES_REQUEST,
    payload:null
})

const getBookedRidesSuccess =bookedRides=>({
    type:TYPES.GET_BOOKED_RIDES_SUCCESS,
    payload:{bookedRides}
})

const getBookedRidesError = (error) =>({
    type:TYPES.GET_BOOKED_RIDES_ERROR,
    payload:error
})

const deletePostedRideRequest =()=>({
    type:TYPES.DELETE_POSTED_RIDE_REQUEST,
    payload:null
})

const deletePostedRideSuccess =()=>({
    type:TYPES.DELETE_POSTED_RIDE_SUCCESS,
    payload:null
})

const deletePostedRideError = (error) =>({
    type:TYPES.DELETE_POSTED_RIDE_ERROR,
    payload:error
})

const changeRideStatusRequest =()=>({
    type:TYPES.CHANGE_RIDE_STATUS_REQUEST,
    payload:null
})

const changeRideStatusSuccess =()=>({
    type:TYPES.CHANGE_RIDE_STATUS_SUCCESS,
    payload:null
})

const changeRideStatusError = (error) =>({
    type:TYPES.CHANGE_RIDE_STATUS_ERROR,
    payload:error
})

const rateDriverToPassengersRequest =()=>({
    type:TYPES.RATE_DRIVER_TO_PASSENGERS_REQUEST,
    payload:null
})

const rateDriverToPassengersSuccess =()=>({
    type:TYPES.RATE_DRIVER_TO_PASSENGERS_SUCCESS,
    payload:null
})

const rateDriverToPassengersError = (error) =>({
    type:TYPES.RATE_DRIVER_TO_PASSENGERS_ERROR,
    payload:error
})

const getBookingDetailsRequest =()=>({
    type:TYPES.GET_BOOKING_DETAILS_REQUEST,
    payload:null
})

const getBookingDetailsSuccess =(data)=>({
    type:TYPES.GET_BOOKING_DETAILS_SUCCESS,
    payload:{data}
})

const getBookingDetailsError = (error) =>({
    type:TYPES.GET_BOOKING_DETAILS_ERROR,
    payload:error
})

const getPassengerDetailsRequest =()=>({
    type:TYPES.GET_PASSENGER_DETAILS_REQUEST,
    payload:null
})

const getPassengerDetailsSuccess =()=>({
    type:TYPES.GET_PASSENGER_DETAILS_SUCCESS,
    payload:null
})

const getPassengerDetailsError = (error) =>({
    type:TYPES.GET_PASSENGER_DETAILS_ERROR,
    payload:error
})

const getRidesStatusRequest =()=>({
    type:TYPES.GET_RIDES_STATUS_REQUEST,
    payload:null
})

const getRidesStatusSuccess =()=>({
    type:TYPES.GET_RIDES_STATUS_SUCCESS,
    payload:null
})

const getRidesStatusError = (error) =>({
    type:TYPES.GET_RIDES_STATUS_ERROR,
    payload:error
})

const passengerRatingRequest =()=>({
    type:TYPES.PASSENGER_RATING_REQUEST,
    payload:null
})

const passengerRatingSuccess =()=>({
    type:TYPES.PASSENGER_RATING_SUCCESS,
    payload:null
})

const passengerRatingError = (error) =>({
    type:TYPES.PASSENGER_RATING_ERROR,
    payload:error
})

const bookingPermissionRequest =()=>({
    type:TYPES.BOOKING_PERMISSION_REQUEST,
    payload:null
})

const bookingPermissionSuccess =()=>({
    type:TYPES.BOOKING_PERMISSION_SUCCESS,
    payload:null
})

const bookingPermissionError = (error) =>({
    type:TYPES.BOOKING_PERMISSION_ERROR,
    payload:{error}
})

export const getPublishedRides =(params, cancelToken)=> async dispatch =>{
    dispatch(getPublishRidesRequest())
    try {
        const publishedRides = await RidesController.getPublishedRides(params, cancelToken);
        dispatch(getPublishRidesSuccess(publishedRides))
    } catch (error) {
        console.log({error})
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message??'Something went wrong')
        dispatch(getPublishRidesError(error))
    }
}

export const cancelBookedRide =(params, cancelToken, callback)=> async dispatch =>{
    dispatch(cancelBookedRideRequest())
    try {
        const cancelRide = await RidesController.cancelRide(params, cancelToken);
        dispatch(cancelBookedRideSuccess(cancelRide))
        DropDownHolder.dropDown.alertWithType('success', 'Success', cancelRide?.message)
        callback()
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(cancelBookedRideError(error))
    }
}

export const getBookedRides =()=> async dispatch =>{
    dispatch(getBookedRidesRequest())
    try {
        const publishedRides = await RidesController.getBookedRides();
        dispatch(getBookedRidesSuccess(publishedRides?.bookedRides))
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message??'Something went wrong')
        dispatch(getBookedRidesError(error))
    }
}

export const deletePublishedRide =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(deletePostedRideRequest())
    try {
        const publishedRides = await RidesController.deletePostedRide(params, cancelToken)
        DropDownHolder.dropDown.alertWithType('success', 'Success', publishedRides?.message)
        dispatch(deletePostedRideSuccess(publishedRides))
        callBack()
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(deletePostedRideError(error))
    }
}

export const changeStatusOfRide =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(changeRideStatusRequest())
    try {
        const publishedRides = await RidesController.changeRideStatus(params, cancelToken)
        DropDownHolder.dropDown.alertWithType('success', 'Success', publishedRides?.message)
        dispatch(changeRideStatusSuccess(publishedRides))
        callBack()
    } catch (error) {
        console.log(typeof(error), error?.message)
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(changeRideStatusError(error))
    }
}

export const rateDriverToPassengers =(params, cancelToken,callback)=> async dispatch =>{
    dispatch(rateDriverToPassengersRequest())
    try {
        const publishedRides = await RidesController.rateDriverToPassengers(params, cancelToken)
        DropDownHolder.dropDown.alertWithType('success', 'Success', publishedRides?.message)
        dispatch(rateDriverToPassengersSuccess(publishedRides))
        callback()
    } catch (error) {
        console.log({error})
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(rateDriverToPassengersError(error))
    }
}

export const getBookingDetails =(params, cancelToken,callback)=> async dispatch =>{
    dispatch(getBookingDetailsRequest())
    try {
        const bookingDetails = await RidesController.getBookingDetails(params, cancelToken)
        dispatch(getBookingDetailsRequest(bookingDetails?.data))
        callback(bookingDetails?.data)
    } catch (error) {
        console.log({error})
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(getBookingDetailsSuccess(error))
    }
}

export const getPassengersDetails =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(getPassengerDetailsRequest())
    try {
        const passengerDetails = await RidesController.getPassengerDetails(params, cancelToken)
        // DropDownHolder.dropDown.alertWithType('success', 'Success', passengerDetails?.message)
        dispatch(getPassengerDetailsSuccess(passengerDetails?.data))
        callBack(passengerDetails?.data)
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error)
        dispatch(getPassengerDetailsError(error))
    }
}

export const getRidesStatus =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(getRidesStatusRequest())
    try {
        const ridesStatus = await RidesController.getRidesStatus(params, cancelToken)
        dispatch(getRidesStatusSuccess(ridesStatus?.data))
        callBack(ridesStatus)
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(getRidesStatusError(error))
    }
}

export const postRidePermission =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(bookingPermissionRequest())
    try {
        const ridesStatus = await RidesController.bookingPermission(params, cancelToken)
        dispatch(bookingPermissionSuccess(ridesStatus?.data))
        callBack(ridesStatus)
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(bookingPermissionError(error))
    }
}

export const passengerRateRide =(params, cancelToken, callBack)=> async dispatch =>{
    dispatch(passengerRatingRequest())
    try {
        const passengerRateing = await RidesController.passengerRating(params, cancelToken)
        dispatch(passengerRatingSuccess(passengerRateing?.data))
        DropDownHolder.dropDown.alertWithType('success', 'Success', passengerRateing?.message)
       
    } catch (error) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message)
        dispatch(passengerRatingError(error))
    }
    callBack()

}