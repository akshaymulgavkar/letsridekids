import {DropDownHolder} from '../../utils/DropDownHolder';
import {Platform} from 'react-native';
import {strings} from '../../Localization/Localization';
import { SearchRideController } from '../controllers/SearchRides.Controller';
export const TYPES = {
  SEARCH_RIDE: 'SEARCH_RIDE',
  SEARCH_RIDE_REQUEST: 'SEARCH_RIDE_REQUEST',
  SEARCH_RIDE_SUCCESS: 'SEARCH_RIDE_SUCCESS',
  SEARCH_RIDE_ERROR: 'SEARCH_RIDE_ERROR',

  BOOK_RIDE: 'BOOK_RIDE',
  BOOK_RIDE_REQUEST: 'BOOK_RIDE_REQUEST',
  BOOK_RIDE_SUCCESS: 'BOOK_RIDE_SUCCESS',
  BOOK_RIDE_ERROR: 'BOOK_RIDE_ERROR',

  GET_DATES_DETAILS: 'GET_DATES_DETAILS',
  GET_DATES_DETAILS_REQUEST: 'GET_DATES_DETAILS_REQUEST',
  GET_DATES_DETAILS_SUCCESS: 'GET_DATES_DETAILS_SUCCESS',
  GET_DATES_DETAILS_ERROR: 'GET_DATES_DETAILS_ERROR',

  PICKUP_LAT_LONG:'PICKUP_LAT_LONG',
  DROP_LAT_LONG:'DROP_LAT_LONG',
  SAVE_DATE:'SAVE_DATE',
  SAVE_DAYS:'SAVE_DAYS',
  SELECTED_DATE:'SELECTED_DATE',
  RIDE_TYPE:'RIDE_TYPE',
  CLEAR_SEARCH_RIDE_DATA:'CLEAR_SEARCH_RIDE_DATA',
  SAVE_SEATS:'SAVE_SEATS'
};

const searchRideRequest = () => ({
  type: TYPES.SEARCH_RIDE_REQUEST,
  payload: null,
});

const searchRideSuccess = searchRideData => ({
  type: TYPES.SEARCH_RIDE_SUCCESS,
  payload: { searchRideData },
});

const searchRideFailure = error => ({
  type: TYPES.SEARCH_RIDE_ERROR,
  payload: {error},
});

const bookRideRequest = () => ({
  type: TYPES.BOOK_RIDE_REQUEST,
  payload: null,
});

const bookRideSuccess = bookRideData => ({
  type: TYPES.BOOK_RIDE_SUCCESS,
  payload: {bookRideData},
});

const bookRideFailure = error => ({
  type: TYPES.BOOK_RIDE_ERROR,
  payload: {error},
});

const getDatesDetailsRequest = () => ({
  type: TYPES.GET_DATES_DETAILS_REQUEST,
  payload: null,
});

const getDatesDetailsSuccess = bookRideData => ({
  type: TYPES.GET_DATES_DETAILS_SUCCESS,
  payload: {bookRideData},
});

const getDatesDetailsFailure = error => ({
  type: TYPES.GET_DATES_DETAILS_ERROR,
  payload: {error},
});

const FromLatLong = fromLatLong => ({
  type:TYPES.PICKUP_LAT_LONG,
  payload:{fromLatLong}
});

const DropLatLong = dropLatLong =>({
  type:TYPES.DROP_LAT_LONG,
  payload:{dropLatLong}
})

const SaveDate = date =>({
  type:TYPES.SAVE_DATE,
  payload:{date}
})

const SaveDays = days =>({
  type:TYPES.SAVE_DAYS,
  payload:{days}
})

const SaveSelectedTime = time =>({
  type:TYPES.SELECTED_DATE,
  payload:{time}
})

const clearSelectedTime = () =>({
  type:TYPES.SELECTED_DATE,
  payload:{time: null}
})

const SaveRideType = rideType =>({
  type:TYPES.RIDE_TYPE,
  payload:{rideType}
})

 const clearSearchRideData =()=>({
  type:TYPES.CLEAR_SEARCH_RIDE_DATA,
  payload :null
 })

 const SaveSeats =SEATS=>({
  type:TYPES.SAVE_SEATS,
  payload:{SEATS}
 })

export const saveFromLatLong = (fromLatLong) => async dispatch =>{
dispatch(FromLatLong(fromLatLong))
}

export const clearTime = () => async dispatch =>{
  dispatch(clearSelectedTime())
  }

export const clearSearchRide =()=> async dispatch =>{
  dispatch(clearSearchRideData())
}

export const saveSelectedTime = (time) => async dispatch =>{
  dispatch(SaveSelectedTime(time))
}

export const saveToLatLong = (toLatLong) => async dispatch =>{
  dispatch(DropLatLong(toLatLong))
}

export const saveDate = (date) => async dispatch=>{
  dispatch(SaveDate(date))
}

export const saveDays = (days) => async dispatch =>{
  dispatch(SaveDays(days))
}

export const saveRideType = (rideType)=> async dispatch=>{
  dispatch(SaveRideType(rideType))
}

export const saveSeats = (seats) =>async dispatch=>{
  dispatch(SaveSeats(seats))
}

export const searchRide = (params, cancelToken, callback) => async (dispatch ) => {
   dispatch(searchRideRequest());
  try {
    const searchRideData = await SearchRideController.searchRides(params,cancelToken);
    if (searchRideData) {
      DropDownHolder.dropDown.alertWithType('success','Success',"Success");
    }
    callback()
    dispatch(searchRideSuccess(searchRideData));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error','Error', error.message);
    dispatch(searchRideFailure(error.message));
  }
};

export const bookRide = (params, cancelToken, callback) => async dispatch => {
  dispatch(bookRideRequest());
  try {
    const bookRideData = await SearchRideController.bookRides(params,cancelToken);
    if (bookRideData) {
      DropDownHolder.dropDown.alertWithType('success','Success',bookRideData?.message);
    }
    console.log({bookRideData})
    callback(bookRideData?.userDetails?.roomId)
    dispatch(bookRideSuccess(bookRideData));
  } catch (error) {
    console.log('book ride error is', error)
    DropDownHolder.dropDown.alertWithType('error','Error', error.message);
    dispatch(bookRideFailure(error.message));
  }
};

export const getDateDetails = (params, callback) => async dispatch => {
  dispatch(getDatesDetailsRequest());
  try {
    const bookRideData = await SearchRideController.getDatesDetails(params);
    if (bookRideData) {
    callback(bookRideData?.data)
    }
    dispatch(getDatesDetailsSuccess(bookRideData));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error','Error', error.message);
    dispatch(getDatesDetailsFailure(error.message));
  }
};