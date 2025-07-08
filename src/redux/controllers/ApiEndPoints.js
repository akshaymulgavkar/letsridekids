
export class ApiEndPoints {
  // static BASE_URL = 'https://staging.letsridekids.com:3000'; // TEST
  // static BASE_URL ='http://52.53.244.22:3000' //production
  
  static SIGNUP = '/api/user/signup';
  static LOGIN = '/api/user/login';
  static FORGOTPASSWORD = '/api/user/forgotPassword';
  static SOCIALLOGIN = '/api/user/socialLogin';
  static VERIFYOTP = '/api/user/verifyOTP';
  static VERIFYUSER = '/api/user/verifyEmail';
  static CREATENEWPASSWORD = '/api/user/resetpassword';
  static DELETEACCOUNT = '/api/user/deleteAccount';
  static CHANGEPASSWORD = '/api/user/changePassword';
  static VERIFYMOBILE = '/api/user/verifyMobile';
  static VERIFYMOBILEOTP = '/api/user/verifyMobileOTP';
  static UPDATEPROFILE = '/api/user/updateprofile/';
  static NOTIFICATIONPERMISSION = '/api/user/notificationPermission';
  static ADDVEHICLEDETAILS = '/api/user/updateCarDetails';
  static VERIFYDL = '/api/user/dlVerification';
  static SENDNOTIFICATION = '/api/user/chatNotification?id=';
  static GETSINGLEPOSTEDRIDE = '/api/user/getSinglePublishedRideDetail?rideId=';
  static GETSINGLEBOOKEDRIDE = '/api/user/getSingleBookingDetail?rideId=';
  static RIDESHAREAPI = '/api/user/shareRideApi/'

  static GETBOOKINGDETAILS = '/api/user/passengerDetailsForRide';

  static GETPUBLISHEDRIDES = '/api/user/userPostedRides/';
  static GETBOOKEDRIDES = '/api/user/getUserBookedRides';
  static CANCELRIDE = '/api/user/cancelBookedRides';
  static DELETEPOSTEDRIDE = '/api/user/deleteUserPostedRides';
  static EDITPOSTEDRIDE = '/api/user/editRides';
  static RESENDOTP = '/api/user/resendOtp';
  static GETDATESDETAILS = '/api/user/recurringDays/';

  static SEARCHRIDES = '/api/user/ride-search';
  static BOOKRIDES = '/api/user/bookRide';
  static PUBLISHRIDES = '/api/user/postridedetails';
  static RIDESTATUS = '/api/user/startRide';
  static RATEDRIVERTOPASSENGERS = '/api/user/passengersRating';
  static GETPASSENGERDETAILS = '/api/user/passengerForRating';
  static GETRIDESSTATUS = '/api/user/rideStatusApi';
  static PASSENGERRATING = '/api/user/rideRating';
  static BOOKINGPERMISSION = '/api/user/bookingPermission';
}