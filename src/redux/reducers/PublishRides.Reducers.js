import {TYPES} from '../actions/PublishRides.Action'

export const PublishRidesReducers =(state={}, {payload, type}) =>{
    switch (type){
        case TYPES.DROP_LAT_LONG_PUBLISH_RIDES:
            return {...state, ...payload}
        case TYPES.PICKUP_LAT_LONG_PUBLISH_RIDES:
            return {...state, ...payload}
        case TYPES.SAVE_RIDE_PUBLISH_DATE:
            return {...state, ...payload}
        case TYPES.SAVE_RIDE_PUBLISH_DAYS:
            return {...state, ...payload}
        case TYPES.SAVE_RIDE_PUBLISH_TIME:
            return {...state, ...payload}
        case TYPES.SAVE_RIDE_TYPE_PUBLISH_RIDE:
            return {...state, ...payload}
        case TYPES.SAVE_STOP_OVERS:
            return {...state,...payload}
        case TYPES.SAVE_SEATS:
            return {...state,...payload}
        case TYPES.SAVE_BOOK_TYPE:
            return {...state,...payload}
        case TYPES.SAVE_RIDE_ID:
            return {...state,...payload}
        case TYPES.SAVE_EDIT_TYPE:
            return {...state,...payload}
        case TYPES.CLEAR_PUBLISH_RIDE_DATA:
            return {...payload}
        default:
            return state
    }
}