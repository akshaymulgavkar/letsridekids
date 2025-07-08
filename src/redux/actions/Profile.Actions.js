import {ProfileController} from '../controllers/Profile.Controllers';
import {strings} from '../../Localization/Localization';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {HttpClient} from '../controllers/HttpClient';

export const TYPES = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',

  VERIFY_MOBILE: 'VERIFY_MOBILE',
  VERIFY_MOBILE_SUCCESS: 'VERIFY_MOBILE_SUCCESS',
  VERIFY_MOBILE_ERROR: 'VERIFY_MOBILE_ERROR',
  VERIFY_MOBILE_REQUEST: 'VERIFY_MOBILE_REQUEST',

  VERIFY_MOBILE_OTP: 'VERIFY_MOBILE_OTP',
  VERIFY_MOBILE_OTP_SUCCESS: 'VERIFY_MOBILE_OTP_SUCCESS',
  VERIFY_MOBILE_OTP_ERROR: 'VERIFY_MOBILE_OTP_ERROR',
  VERIFY_MOBILE_OTP_REQUEST: 'VERIFY_MOBILE_OTP_REQUEST',

  EDIT_PROFILE: 'EDIT_PROFILE',
  EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
  EDIT_PROFILE_ERROR: 'EDIT_PROFILE_ERROR',
  EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST',

  SAVE_VEHICLE_DETAILS: 'SAVE_VEHICLE_DETAILS',
  SAVE_VEHICLE_DETAILS_SUCCESS: 'SAVE_VEHICLE_DETAILS_SUCCESS',
  SAVE_VEHICLE_DETAILS_ERROR: 'SAVE_VEHICLE_DETAILS_ERROR',
  SAVE_VEHICLE_DETAILS_REQUEST: 'SAVE_VEHICLE_DETAILS_REQUEST',

  VERIFY_DRIVING_LISENCE: 'VERIFY_DRIVING_LISENCE',
  VERIFY_DRIVING_LISENCE_SUCCESS: 'VERIFY_DRIVING_LISENCE_SUCCESS',
  VERIFY_DRIVING_LISENCE_ERROR: 'VERIFY_DRIVING_LISENCE_ERROR',
  VERIFY_DRIVING_LISENCE_REQUEST: 'VERIFY_DRIVING_LISENCE_REQUEST',

  SEND_NOTIFICATION: 'SEND_NOTIFICATION',
  SEND_NOTIFICATION_SUCCESS: 'SEND_NOTIFICATION_SUCCESS',
  SEND_NOTIFICATION_ERROR: 'SEND_NOTIFICATION_ERROR',
  SEND_NOTIFICATION_REQUEST: 'SEND_NOTIFICATION_REQUEST',
};

const changePasswordRequest = () => ({
  type: TYPES.CHANGE_PASSWORD_REQUEST,
  payload: null,
});

const changePasswordSuccess = () => ({
  type: TYPES.CHANGE_PASSWORD_SUCCESS,
  payload: null,
});

const changePasswordError = (error) => ({
  type: TYPES.CHANGE_PASSWORD_ERROR,
  payload: {error},
});

const verifyMobileRequest = () => ({
  type: TYPES.VERIFY_MOBILE_REQUEST,
  payload: null,
});

const verifyMobileSuccess = (data) => ({
  type: TYPES.VERIFY_MOBILE_SUCCESS,
  payload: {data},
});

const verifyMobileError = (error) => ({
  type: TYPES.VERIFY_MOBILE_ERROR,
  payload: error,
});

const verifyMobileOtpRequest = () => ({
    type: TYPES.VERIFY_MOBILE_OTP_REQUEST,
    payload: null,
  });
  
const verifyMobileOtpSuccess = () => ({
    type: TYPES.VERIFY_MOBILE_OTP_SUCCESS,
    payload: null,
});
  
const verifyMobileOtpError = (error) => ({
    type: TYPES.VERIFY_MOBILE_OTP_ERROR,
    payload: error,
});

const editProfileRequest = () => ({
    type: TYPES.EDIT_PROFILE_REQUEST,
    payload: null,
});
  
const editProfileSuccess = () => ({
    type: TYPES.EDIT_PROFILE_SUCCESS,
    payload: null,
});
  
const editProfileError = (error) => ({
    type: TYPES.EDIT_PROFILE_ERROR,
    payload: {error},
});

const saveVehicleDetailsRequest = () => ({
  type: TYPES.SAVE_VEHICLE_DETAILS_REQUEST,
  payload: null,
});

const saveVehicleDetailsSuccess = () => ({
  type: TYPES.SAVE_VEHICLE_DETAILS_SUCCESS,
  payload: null,
});

const saveVehicleDetailsError = () => ({
  type: TYPES.SAVE_VEHICLE_DETAILS_ERROR,
  payload: null,
});

const verifyDrivingLisenceRequest = () => ({
  type: TYPES.VERIFY_DRIVING_LISENCE_REQUEST,
  payload: null,
});

const verifyDrivingLisenceSuccess = () => ({
  type: TYPES.VERIFY_DRIVING_LISENCE_SUCCESS,
  payload: null,
});

const verifyDrivingLisenceError = () => ({
  type: TYPES.VERIFY_DRIVING_LISENCE_ERROR,
  payload: null,
});

const sendNotificationRequest = () => ({
  type: TYPES.SEND_NOTIFICATION_REQUEST,
  payload: null,
});

const sendNotificationeSuccess = () => ({
  type: TYPES.SEND_NOTIFICATION_SUCCESS,
  payload: null,
});

const sendNotificationeError = (error) => ({
  type: TYPES.SEND_NOTIFICATION_ERROR,
  payload: {error},
});

  
export const ChangePasswordViaProfile = (params, cancelToken, callback) => async dispatch => {
    dispatch(changePasswordRequest());
    try {
      const data = await ProfileController.ChangePassword(params, cancelToken);
      DropDownHolder.dropDown.alertWithType('success', 'Success', data?.message);
     callback();
      dispatch(changePasswordSuccess());
    } catch (error) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
      dispatch(changePasswordError(error));
    }
  };

export const saveVehicleDetails = (params, cancelToken, callback) => async dispatch => {
    dispatch(saveVehicleDetailsRequest());
    try {
      const data = await ProfileController.AddVehicleDetails(params, cancelToken);
      callback();
      DropDownHolder.dropDown.alertWithType('success', 'Success', data.message);
      dispatch(saveVehicleDetailsSuccess(data));
    } catch (error) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
      dispatch(saveVehicleDetailsError(error));
    }
};

export const VerifyMobile = (params, cancelToken, callback) => async dispatch => {
    dispatch(verifyMobileRequest());
    try {
      const data = await ProfileController.VerifyMobile(params, cancelToken);
      dispatch(verifyMobileSuccess(data?.data))
      callback()
    } catch (error) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
      dispatch(verifyMobileError(error));
    }
  };

export const VerifyMobileOtp = (params, cancelToken, callback) => async dispatch => {
    dispatch(verifyMobileOtpRequest());
    try {
      const data = await ProfileController.VerifyMobileOtp(params, cancelToken);
      callback();
      dispatch(verifyMobileOtpSuccess(data));
    } catch (error) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
      dispatch(verifyMobileOtpError(error));
    }
 };

 export const UpdateProfile = (formdata, cancelToken) => async dispatch => {
  dispatch(editProfileRequest());
  try {
    const data = await ProfileController.EditProfile(formdata, cancelToken);
    DropDownHolder.dropDown.alertWithType('success', 'Success', data?.message);
    dispatch(editProfileSuccess(data));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(editProfileError(error));
  }
};

export const VerifyDrivingLisence = (params, cancelToken, callback) => async dispatch => {
  dispatch(verifyDrivingLisenceRequest());
  try {
    const data = await ProfileController.VerifyDrivingLisence(params, cancelToken);
    DropDownHolder.dropDown.alertWithType('success', 'Success', data?.message);
    console.log({callback})
    dispatch(verifyDrivingLisenceSuccess(data))
    callback(data?.sata)
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(verifyDrivingLisenceError(error));
  }
};

export const SendNotification = (params) => async dispatch => {
  dispatch(sendNotificationRequest());
  try {
    const data = await ProfileController.SendNotification(params);
    console.log('kjbhvgcf',data)
    dispatch(sendNotificationeSuccess(data));
  } catch (error) {
    console.log({error})
    // DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(sendNotificationeError(error));
  }
};
