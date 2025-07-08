import {DropDownHolder} from '../../utils/DropDownHolder';
import {strings} from '../../Localization/Localization';
import { PublishRideController } from '../controllers/PublishRIdes.Controller';

export const TYPES = {
  PICKUP_LAT_LONG_PUBLISH_RIDES: 'PICKUP_LAT_LONG_PUBLISH_RIDES',
  DROP_LAT_LONG_PUBLISH_RIDES: 'DROP_LAT_LONG_PUBLISH_RIDES',
  SAVE_RIDE_PUBLISH_DATE:'SAVE_RIDE_PUBLISH_DATE',
  SAVE_RIDE_PUBLISH_DAYS:'SAVE_RIDE_PUBLISH_DAYS',
  SAVE_RIDE_PUBLISH_TIME:'SAVE_RIDE_PUBLISH_TIME',
  SAVE_RIDE_PUBLISH_TYPE:'SAVE_RIDE_PUBLISH_TYPE',
  SAVE_RIDE_TYPE_PUBLISH_RIDE:'SAVE_RIDE_TYPE_PUBLISH_RIDE',
  SAVE_EDIT_TYPE:'SAVE_EDIT_TYPE',

  PUBLISH_RIDE:'PUBLISH_RIDE',
  PUBLISH_RIDE_REQUEST:'PUBLISH_RIDE_REQUEST',
  PUBLISH_RIDE_SUCCESS:'PUBLISH_RIDE_SUCCESS',
  PUBLISH_RIDE_ERROR:'PUBLISH_RIDE_ERROR',

  EDIT_RIDE:'EDIT_RIDE',
  EDIT_RIDE_REQUEST:'EDIT_RIDE_REQUEST',
  EDIT_RIDE_SUCCESS:'EDIT_RIDE_SUCCESS',
  EDIT_RIDE_ERROR:'EDIT_RIDE_ERROR',

  SAVE_STOP_OVERS:'SAVE_STOP_OVERS',
  SAVE_SEATS:'SAVE_SEATS',
  SAVE_BOOK_TYPE:'SAVE_BOOK_TYPE',
  SAVE_RIDE_ID:'SAVE_RIDE_ID',

  CLEAR_PUBLISH_RIDE_DATA:'CLEAR_PUBLISH_RIDE_DATA'
};

const pickUpLatLong = pickLatLong => ({
  type: TYPES.PICKUP_LAT_LONG_PUBLISH_RIDES,
  payload: {pickLatLong},
});

const dropLatLong = dropLatLong => ({
  type: TYPES.DROP_LAT_LONG_PUBLISH_RIDES,
  payload: {dropLatLong},
});

const ridePublishDate = date =>({
    type:TYPES.SAVE_RIDE_PUBLISH_DATE,
    payload:{date}
})

const ridePublishDays = days =>({
  type:TYPES.SAVE_RIDE_PUBLISH_DAYS,
  payload:{days}
})

const ridePublishTime = time =>({
  type :TYPES.SAVE_RIDE_PUBLISH_TIME,
  payload:{time}
})

const publishRideRequest = ()=>({
  type:TYPES.PUBLISH_RIDE_REQUEST,
  payload:null
})

const publishRideSuccess = publishRideData =>({
  type :TYPES.PUBLISH_RIDE_SUCCESS,
  payload: {publishRideData}
})

const publishRideFailure = error =>({
  type:TYPES.PUBLISH_RIDE_ERROR,
  payload :{error}
})

const editRideSuccess = (data) =>({
  type:TYPES.EDIT_RIDE_SUCCESS,
  payload: {data}
})

const editRideFailure = error =>({
  type:TYPES.EDIT_RIDE_ERROR,
  payload :{error}
})


const editRideRequest = ()=>({
  type:TYPES.EDIT_RIDE_REQUEST,
  payload:null
})

const rideTypePublishRide = rideType=>({
  type:TYPES.SAVE_RIDE_TYPE_PUBLISH_RIDE,
  payload: {rideType}
})

const clearPublishRideData = ()=>({
  type:TYPES.CLEAR_PUBLISH_RIDE_DATA,
  payload:null
})

const SaveStopOvers = (stops) =>({
  type:TYPES.SAVE_STOP_OVERS,
  payload:{stops:stops}
})

const SaveSeats = (seats) =>({
  type:TYPES.SAVE_SEATS,
  payload:{seats:seats}
})

const SaveBookingType = (type) =>({
  type:TYPES.SAVE_BOOK_TYPE,
  payload:{type:type}
})

const SavePostedRide = (id) =>({
  type:TYPES.SAVE_RIDE_ID,
  payload:{id:id}
})

const SaveEditType = (editType) =>({
  type:TYPES.SAVE_RIDE_ID,
  payload:{editType:editType}
})

export const saveFromLatLongPublish = fromLatLong => async dispatch => {
  dispatch(pickUpLatLong(fromLatLong));
};

export const saveToLatLongPublish = toLatLong => async dispatch => {
  dispatch(dropLatLong(toLatLong));
};

export const savePublishRideDate = date => async dispatch=>{
    dispatch(ridePublishDate(date))
}

export const savePublishRideDays = date => async dispatch=>{
  dispatch(ridePublishDays(date))
}

export const savePublishRideTime= time => async dispatch =>{
  dispatch(ridePublishTime(time))
}

export const saveRideTypePublishRide= rideType => async dispatch =>{
  dispatch(rideTypePublishRide(rideType))
}

export const saveStopOvers= stopOvers => async dispatch =>{
  dispatch(SaveStopOvers(stopOvers))
}
export const saveSeatsPublishRides= seats => async dispatch =>{
  dispatch(SaveSeats(seats))
}

export const saveRideBookingType= type => async dispatch =>{
  dispatch(SaveBookingType(type))
}

export const savePostedRideId= id => async dispatch =>{
  dispatch(SavePostedRide(id))
}

export const saveEditType= editType => async dispatch =>{
  dispatch(SaveEditType(editType))
}


export const clearPublishData = ()=> async dispatch =>{
  dispatch(clearPublishRideData())
}
export const publishRide = (params, cancelToken, callBack) => async dispatch =>{
  dispatch(publishRideRequest())
  try {
    const publishRideData = await PublishRideController.publishRides(params, cancelToken);
    if (publishRideData){
      DropDownHolder.dropDown.alertWithType('success','Success',"Success")
    }
    callBack()
    dispatch(publishRideSuccess(publishRideData))
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message)
    dispatch(publishRideFailure(error.message))
  }
}

export const editRide = (params, cancelToken, callBack) => async dispatch =>{
  dispatch(editRideRequest())
  try {
    const publishRideData = await PublishRideController.editRides(params, cancelToken);
    if (publishRideData){
      DropDownHolder.dropDown.alertWithType('success','Success',"Success")
    }
    callBack()
    dispatch(editRideSuccess())
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message)
    dispatch(editRideFailure(error.message))
  }
}