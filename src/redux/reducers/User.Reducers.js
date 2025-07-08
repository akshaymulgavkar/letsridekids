import {TYPES} from '../actions/User.Actions';

export const UserReducers = (state = {}, {payload, type}) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return {...state, ...payload.user};
    case TYPES.SOCIALLOGIN_SUCCESS:
      return {...state, ...payload.user};
    case TYPES.VERIFY_USER_SUCCESS:
      return {...state,...payload.user}
    case TYPES.TOGGLE_NOTIFICATION_SUCCESS:
      return  {...state, ...payload.user}
    case TYPES.CLEAR_STORE:
      return {};
    case TYPES.CLEAR_USER:
      return {};
    default:
      return state;
  }
};
