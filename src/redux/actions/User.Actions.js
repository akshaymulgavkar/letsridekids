import {UserController} from '../controllers/User.Controllers';
import axios from 'axios';
import {strings} from '../../Localization/Localization';
import {Alert, DeviceEventEmitter} from 'react-native';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Platform} from 'react-native';
import {storage} from '../storage/Index.Storage';
import {appleAuth, appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import { HttpClient } from '../controllers/HttpClient';
import { ProfileController } from '../controllers/Profile.Controllers';
import { checkToken } from '../../components';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  DELETEACCOUNT: 'DELETEACCOUNT',
  DELETEACCOUNT_REQUEST: 'DELETEACCOUNT_REQUEST',
  DELETEACCOUNT_ERROR: 'DELETEACCOUNT_ERROR',
  DELETEACCOUNT_SUCCESS: 'DELETEACCOUNT_SUCCESS',
  
  SOCIALLOGIN: 'SOCIALLOGIN',
  SOCIALLOGIN_REQUEST: 'SOCIALLOGIN_REQUEST',
  SOCIALLOGIN_ERROR: 'SOCIALLOGIN_ERROR',
  SOCIALLOGIN_SUCCESS: 'SOCIALLOGIN_SUCCESS',

  SIGNUP: 'SIGNUP',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',

  FORGOTPASSWORD: 'FORGOTPASSWORD',
  FORGOTPASSWORD_REQUEST: 'FORGOTPASSWORD_REQUEST',
  FORGOTPASSWORD_ERROR: 'FORGOTPASSWORD_ERROR',
  FORGOTPASSWORD_SUCCESS: 'FORGOTPASSWORD_SUCCESS',

  VERIFYOTP: 'VERIFYOTP',
  VERIFYOTP_REQUEST: 'VERIFYOTP_REQUEST',
  VERIFYOTP_ERROR: 'VERIFYOTP_ERROR',
  VERIFYOTP_SUCCESS: 'VERIFYOTP_SUCCESS',

  RESENDOTP: 'RESENDOTP',
  RESENDOTP_REQUEST: 'RESENDOTP_REQUEST',
  RESENDOTP_ERROR: 'RESENDOTP_ERROR',
  RESENDOTP_SUCCESS: 'RESENDOTP_SUCCESS',

  NEWPASSWORD:'NEWPASSWORD',
  NEWPASSWORD_REQUEST:'NEWPASSWORD_REQUEST',
  NEWPASSWORD_ERROR:'NEWPASSWORD_ERROR',
  NEWPASSWORD_SUCCESS:'NEWPASSWORD_SUCCESS',

  VERIFY_USER:'VERIFY_USER',
  VERIFY_USER_REQUEST:'VERIFY_USER_REQUEST',
  VERIFY_USER_ERROR:'VERIFY_USER_ERROR',
  VERIFY_USER_SUCCESS:'VERIFY_USER_SUCCESS',

  TOGGLE_NOTIFICATION:'TOGGLE_NOTIFICATION',
  TOGGLE_NOTIFICATION_REQUEST:'TOGGLE_NOTIFICATION_REQUEST',
  TOGGLE_NOTIFICATION_ERROR:'TOGGLE_NOTIFICATION_ERROR',
  TOGGLE_NOTIFICATION_SUCCESS:'TOGGLE_NOTIFICATION_SUCCESS',

  GET_SINGLE_POSTED_RIDE:'GET_SINGLE_POSTED_RIDE',
  GET_SINGLE_POSTED_RIDE_REQUEST:'GET_SINGLE_POSTED_RIDE_REQUEST',
  GET_SINGLE_POSTED_RIDE_ERROR:'GET_SINGLE_POSTED_RIDE_ERROR',
  GET_SINGLE_POSTED_RIDE_SUCCESS:'GET_SINGLE_POSTED_RIDE_SUCCESS',

  SAVE_EMAIL:'SAVE_EMAIL',
  CLEAR_USER: 'CLEAR_USER',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = user => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: {user},
});

const loginError = error => ({
  type: TYPES.LOGIN_ERROR,
  payload: {error},
});

const deleteAccountRequest = () => ({
  type: TYPES.DELETEACCOUNT_REQUEST,
  payload: null,
});

const deleteAccountSuccess = () => ({
  type: TYPES.DELETEACCOUNT_SUCCESS,
  payload: null,
});

const deleteAccountError = error => ({
  type: TYPES.DELETEACCOUNT_ERROR,
  payload: {error},
});

const socialloginRequest = () => ({
  type: TYPES.SOCIALLOGIN_REQUEST,
  payload: null,
});

const socialloginSuccess = user => ({
  type: TYPES.SOCIALLOGIN_SUCCESS,
  payload: {user},
});

const socialloginError = error => ({
  type: TYPES.SOCIALLOGIN_ERROR,
  payload: {error},
});

const signupRequest = () => ({
  type: TYPES.SIGNUP_REQUEST,
  payload: null,
});

const signupSuccess = () => ({
  type: TYPES.SIGNUP_SUCCESS,
  payload: null,
});

const signupError = error => ({
  type: TYPES.SIGNUP_ERROR,
  payload: {error},
});

const forgotpasswordRequest = () => ({
  type: TYPES.FORGOTPASSWORD_REQUEST,
  payload: null,
});

const forgotpasswordSuccess = () => ({
  type: TYPES.FORGOTPASSWORD_SUCCESS,
  payload: null,
});

const forgotpasswordError = error => ({
  type: TYPES.FORGOTPASSWORD_ERROR,
  payload: {error},
});

const verifyOtpRequest = ()=>({
  type: TYPES.VERIFYOTP_REQUEST,
  payload:null
})

const verifyOtpSuccess = () =>({
  type: TYPES.VERIFYOTP_SUCCESS,
  payload:null
})

const verifyOtpError = ({error}) =>({
  type: TYPES.VERIFYOTP_ERROR,
  payload:{error}
})

const resendOtpRequest = ()=>({
  type: TYPES.RESENDOTP_REQUEST,
  payload:null
})

const resendOtpSuccess = () =>({
  type: TYPES.RESENDOTP_SUCCESS,
  payload:null
})

const resendOtpError = ({error}) =>({
  type: TYPES.RESENDOTP_ERROR,
  payload:{error}
})

const createNewPasswordRequest = ()=>({
  type: TYPES.VERIFYOTP,
  payload:null
})

const createNewPasswordSuccess = ({data}) =>({
  type: TYPES.VERIFYOTP_SUCCESS,
  payload:{data}
})

const createNewPasswordError = ({error}) =>({
  type: TYPES.VERIFYOTP_ERROR,
  payload:{error}
})

const verifyUserRequest =()=>({
  type:TYPES.VERIFY_USER_REQUEST,
  payload:null
})

const verifyUserSuccess =(user)=>({
  type:TYPES.VERIFY_USER_SUCCESS,
  payload:{user}
})

const verifyUserError =(error)=>({
  type:TYPES.VERIFY_USER_ERROR,
  payload:{error}
})

const toggleNotificationRequest =()=>({
  type:TYPES.TOGGLE_NOTIFICATION_REQUEST,
  payload:null
})

const toggleNotificationSuccess =(user)=>({
  type:TYPES.TOGGLE_NOTIFICATION_SUCCESS,
  payload:{user}
})

const toggleNotificationError =(error)=>({
  type:TYPES.TOGGLE_NOTIFICATION_ERROR,
  payload:{error}
})

const getSinglePostedRideRequest =()=>({
  type:TYPES.GET_SINGLE_POSTED_RIDE_REQUEST,
  payload:null
})

const getSinglePostedRideSuccess =(data)=>({
  type:TYPES.GET_SINGLE_POSTED_RIDE_SUCCESS,
  payload:{data}
})

const getSinglePostedRideError =(error)=>({
  type:TYPES.GET_SINGLE_POSTED_RIDE_ERROR,
  payload:{error}
})


const clearUser = () => ({
  type: TYPES.CLEAR_USER,
  payload: null,
});

export const login = (params, cancelToken, callback) => async dispatch => {
  dispatch(loginRequest());
  try {
    const fcmToken = await checkToken(params)
    const user = await UserController.login(fcmToken, cancelToken);
    dispatch(loginSuccess(user?.data));
    HttpClient.setAuthorization(user?.data.accessToken)
  } catch (error) {
    if (error?.message == 'Please verify your mail'){
      callback()
    }
    else if(error?.message != 'Please verify your mail') {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message);
    }
    dispatch(loginError(error));
  }
};

export const signup = (params, cancelToken, callBack) => async dispatch => {
  dispatch(signupRequest());
  try {
    const fcmToken = await checkToken(params)
    console.log({fcmToken})
    const signUp = await UserController.signUp(fcmToken, cancelToken);
    if (signUp) {
      DropDownHolder.dropDown.alertWithType('success','Success',strings.common.verificationLinkSent);
    }
    callBack()
    dispatch(signupSuccess(signUp));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(signupError(error.message));
  }
};


export const verifyUser = (params, cancelToken,callback) => async dispatch => {
  dispatch(verifyUserRequest());
  try {
    const fcmToken = await checkToken(params)
    const user = await UserController.verifyUser(fcmToken, cancelToken);
    if (user) {
      DropDownHolder.dropDown.alertWithType('success','Success',user.message);
    }
    dispatch(verifyUserSuccess(user?.data));
    HttpClient.setAuthorization(user?.data.accessToken)
    callback()
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please enter a valid otp');
    dispatch(verifyUserError(error.message));
  }
};

export const forgotpassword = (params, callback,cancelToken) => async dispatch => {
  dispatch(forgotpasswordRequest());
  try {
    const user = await UserController.forgotpassword(params, cancelToken);
    if (user) {
      DropDownHolder.dropDown.alertWithType('success','Success',strings.common.forgotpassword);
    }
    callback()
    dispatch(forgotpasswordSuccess());
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please enter a valid email');
    dispatch(forgotpasswordError(error.message));
  }
};

export const verifyotp = (params, cancelToken,callback) => async dispatch => {
  dispatch(verifyOtpRequest());
  try {
    const user = await UserController.verifyOtp(params, cancelToken);
    if (user) {
      DropDownHolder.dropDown.alertWithType('success','Success',user.message);
    }
    callback()
    dispatch(verifyOtpSuccess());
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message);
    dispatch(verifyOtpError(error.message));
  }
};

export const resendotp = (params, cancelToken, callBack) => async dispatch => {
  dispatch(resendOtpRequest());
  try {
    const user = await UserController.resendOtp(params, cancelToken);
    if (user) {
      DropDownHolder.dropDown.alertWithType('success','Success',user.message);
    }
    callBack()
    dispatch(resendOtpSuccess());
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error?.message);
    dispatch(resendOtpError(error.message));
  }
};

export const createNewPassword = (params, callback,cancelToken) => async dispatch => {
  dispatch(createNewPasswordRequest());
  try {
    const user = await UserController.createNewPassword(params, cancelToken);
    if (user) {
      DropDownHolder.dropDown.alertWithType('success','Success',strings.common.forgotpassword);
    }
    callback()
    dispatch(createNewPasswordSuccess(user));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(createNewPasswordError(error.message));
  }
};

export const SingUpWithGoogle = () => async dispatch => {
  console.log('google Hit')
  dispatch(socialloginRequest());
  try {
    GoogleSignin.configure({
      webClientId:
        '291837779495-d0tpdh5bjhf0r5maa2g2sbic5de0kdq3.apps.googleusercontent.com',
    });
    GoogleSignin.signOut();
    // GoogleSignin.hasPlayServices().then((hasPlayService) => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const data = await auth().signInWithCredential(googleCredential);
    const fcmToken = await checkToken({
      fullname:data.user.displayName,
      firbaseId: data.user.uid,
      email: data.user.email,
      AccountType: 'Google',
      deviceType: Platform.OS === 'android' ? 1 : 2,
      profileimage:data.user.photoURL
    })
    console.log({fcmToken})
    const user = await UserController.socialLogin(fcmToken);
    dispatch(loginSuccess(user))
    dispatch(socialloginSuccess(user.data));
    HttpClient.setAuthorization(user?.data.accessToken)
  } catch (error) {
    console.log({error})
    dispatch(socialloginError(error.message));
  }
};

export const SignUpWithApple = () => async dispatch => {
  dispatch(socialloginRequest());
  try {
    if (Platform.OS === 'ios'){

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    var details = await auth().signInWithCredential(appleCredential);
    const fcmToken = await checkToken({
      fullname:details.user.displayName,
      firbaseId: details.user.uid,
      email: details.additionalUserInfo.profile.email,
      AccountType: 'Apple',
      deviceType: Platform.OS === 'android' ? 1 : 2,
      profileimage:details.user.photoURL

    })

    const user = await UserController.socialLogin(fcmToken);

    HttpClient.setAuthorization(user?.data?.accessToken)
        dispatch(socialloginSuccess(user?.data))
    }else {
      appleAuthAndroid.configure({
        clientId: "com.lrk.letsridekids.services",
        redirectUri: "https://lets-ride-kids-lrk.firebaseapp.com/__/auth/handler",
        scope: appleAuthAndroid.Scope.ALL,
        responseType: appleAuthAndroid.ResponseType.ALL,
      });
      const { id_token, nonce } = await appleAuthAndroid.signIn();
      const appleCredential = auth.AppleAuthProvider.credential(id_token, nonce);
      var details = await auth().signInWithCredential(appleCredential);
      const fcmToken = await checkToken({
        fullname:details.user.displayName,
        firbaseId: details.user.uid,
        email: details.additionalUserInfo.profile.email,
        AccountType: 'Apple',
        deviceType: Platform.OS === 'android' ? 1 : 2,
        profileimage:details.user.photoURL
  
      })
      const user = await UserController.socialLogin(fcmToken);
      HttpClient.setAuthorization(user?.data?.accessToken)
      dispatch(socialloginSuccess(user?.data))
    }
  } catch (error) {
    dispatch(socialloginError(error))
  }
};


export const SignUpWithFaceBook = () => async dispatch => {
  dispatch(socialloginRequest());
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      dispatch(socialloginError(''));
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      dispatch(socialloginError(strings.common.somethingWentWrong));
      throw strings.common.somethingWentWrong;
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    let details = await auth().signInWithCredential(facebookCredential);
const fcmToken = await checkToken({
  fullname:details.user.displayName,
  firbaseId: details.user.uid,
  email: details.additionalUserInfo.profile.email??'',
  AccountType: 'Facebook',
  deviceType: Platform.OS === 'android' ? 1 : 2,
  profileimage:details.user.photoURL
})
    const user = await UserController.socialLogin(fcmToken);
    console.log({user})
    dispatch(socialloginSuccess(user.data));
    HttpClient.setAuthorization(user?.data.accessToken)
  } catch (error) {
    console.log({error})
    dispatch(socialloginError(error.message));
  }
};

export const deleteAccount = (params, cancelToken) => async dispatch => {
  dispatch(deleteAccountRequest())
  try {
    const user = await UserController.deleteAccount(params, cancelToken);
    dispatch(deleteAccountSuccess());
    dispatch(clearUser()); 
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error);
    dispatch(deleteAccountError(error));
  }
};

export const logout = () => async dispatch => {
  try {
  dispatch(clearUser()); 
  } catch (error) {
  }
};

export const saveUserData = (data) => async dispatch => {
  try {
  dispatch(verifyUserSuccess(data)); 
  } catch (error) {
  }
};

export const saveVehicleDetails = (params, cancelToken, callback) => async dispatch => {
  dispatch(verifyUserRequest());
  try {
    const data = await ProfileController.AddVehicleDetails(params, cancelToken);
    callback();
    DropDownHolder.dropDown.alertWithType('success', 'Success', data.message);
    dispatch(verifyUserSuccess(data?.data));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(verifyUserError(error));
  }
};

export const VerifyMobileOtp = (params, cancelToken, callback) => async dispatch => {
    dispatch(verifyUserRequest());
    try {
      const data = await ProfileController.VerifyMobileOtp(params, cancelToken);
      callback();
      dispatch(verifyUserSuccess(data?.data));
    } catch (error) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
      dispatch(verifyUserError(error));
    }
 };

 export const UpdateProfile = (formdata, cancelToken, callback) => async dispatch => {
  dispatch(verifyUserRequest());
  try {
    const data = await ProfileController.EditProfile(formdata, cancelToken);
    DropDownHolder.dropDown.alertWithType('success', 'Success', data?.message);
    callback()
    console.log('data from response is', data?.userData)
    dispatch(verifyUserSuccess(data?.userData));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(verifyUserError(error));
  }
};

export const ToggleNotifications = (params, cancelToken, callback) => async dispatch => {
  dispatch(toggleNotificationRequest());
  try {
    const data = await ProfileController.toggleNotification(params, cancelToken);
    DropDownHolder.dropDown.alertWithType('success', 'Success', data?.message);
    callback(data)
    dispatch(toggleNotificationSuccess(data?.data));
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(toggleNotificationError(error));
  }
};

export const GetSinglePostedRide = (params, callback) => async dispatch => {
  dispatch(getSinglePostedRideRequest());
  try {
    const data = await ProfileController.getSinglePostedRide(params);
    callback(data)
    dispatch(getSinglePostedRideSuccess(data?.data));
    console.log('getSingleApi', data)
  } catch (error) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', error.message);
    dispatch(getSinglePostedRideError(error));
  }
};