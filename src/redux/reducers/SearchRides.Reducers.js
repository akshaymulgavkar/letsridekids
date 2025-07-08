import {TYPES} from '../actions/SearchRides.Action';

export const SearchRidesReducers = (state = {}, {payload, type}) => {
  switch (type) {
    case TYPES.SEARCH_RIDE_SUCCESS:
      return {  ...state, searchRideData : payload?.searchRideData };
    case TYPES.DROP_LAT_LONG:
      return {...state, ...payload};
    case TYPES.PICKUP_LAT_LONG:
      return {...state, ...payload}
    case TYPES.SAVE_DATE:
      return {...state, ...payload}
    case TYPES.SAVE_DAYS:
      return {...state, ...payload}
    case TYPES.RIDE_TYPE: 
      return {...state, ...payload}
    case TYPES.SELECTED_DATE:
      return {...state, ...payload}
    case TYPES.SAVE_SEATS:
      return {...state, ...payload}
    case TYPES.GET_DATES_DETAILS_SUCCESS:
        return {...state, ...payload}
    case TYPES.CLEAR_SEARCH_RIDE_DATA:
      return {}
    default:
      return state;
  }
};
