import {TYPES} from '../actions/Rides.Actions'

export const RidesReducers =(state ={}, {payload, type})=>{
    switch(type){
        case TYPES.GET_PUBLISHED_RIDES_SUCCESS:
            return {...state, ...payload};
        case TYPES.GET_BOOKED_RIDES_SUCCESS:
            return {...state, ...payload};
        default:
            return state;
    }
}