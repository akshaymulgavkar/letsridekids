import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  routeText: {
    fontFamily: Fonts.Lato700,
    color: '#26185F',
    fontSize: hp('1.8%'),
  },
  fromText: {
    color: '#26185F',
    fontSize: 16,
    fontFamily: Fonts.Lato700,
    width: '80%',
  },
  distanceText: {
    color: '#876DEE',
  },
  upperContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: '4%',
    width: '90%',
  },
  fromToText: {
    fontSize: 16,
    color: '#00000080',
    fontFamily: Fonts.Lato400,
  },
  rating: {
    color: '#00000055',
    fontFamily: Fonts.Lato700,
    fontSize: 16,
    marginStart: '3%',
  },
  nameText: {
    color: '#000',
    fontFamily: Fonts.Lato700,
    fontSize: 16,
    // width:'80%',
  },
  Divider: {
    backgroundColor: '#00000010',
    height: '.25%',
    width: '100%',
    alignSelf: 'center',
  },
  dateTimeHeading: {
    color: '#000',
    fontFamily: Fonts.Lato700,
    fontSize: hp('2%'),
    // marginTop: '8%',
  },
  rideCompleted: {
    color: '#17A500',
    fontFamily: Fonts.Lato700,
    fontSize: hp('2%'),
    textAlign:'center'
  },
  dateTimeText: {
    color: '#00000060',
    fontFamily: Fonts.Lato400,
    fontSize: hp('2%'),
    marginTop: '2%',
  },
  lowerContainer: {
    flexDirection: 'row',
    // marginBottom: '10%',
    marginTop: '10%',
    // marginTop:'5%'
  },
  detailsContainer: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
  pickLocationText: {
    width: '60%',
    color: '#000000',
    // opacity: 0.8,
    fontSize: 16,
    fontFamily: Fonts.Lato700,
  },
  pickStopsLocationText: {
    width: '60%',
    color: '#00000070',
    fontSize: 16,
    fontFamily: Fonts.Lato400,
  },
  pickLocationTimeText: {
    width: '30%',
    color: '#000',
    opacity: 0.8,
    fontSize: 16,
    textAlign: 'right',
    fontFamily: Fonts.Lato400,
  },
  profileImage: {
    marginStart: 10,
    marginTop: 10,
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  rateRideText: {
    alignSelf: 'flex-start',
    width: '95%',
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.Lato700,
  },
  bottomRating: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
  rateRide: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20,
    color: '#000000',
    fontFamily: Fonts.Lato700,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor:'#FF4141',
    borderRadius:10
  },
  trackButtonContainer: {
    width: '30%',
    alignSelf: 'center',
    backgroundColor:'#00F9FF'
  },
  rideStatus: {
    textAlign: 'center',
    alignSelf: 'center',
    marginStart: '10%',
    padding: '2%',
    borderRadius: 10,
    borderWidth: 1,
  },

  rideTypeContainer: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    marginStart: '5%',
    width: '30%',
    borderRadius: 10,
  },
  rideTypeText: {
    padding: 5,
    textAlign: 'center',
    fontFamily: Fonts.Lato400,
    fontSize: 14,
    color:'#000'
  },

  rideStatusContainer: {
    width: '30%',
    alignItems: 'center',
    flexDirection: 'row',
    right:20
  },
  rideStatusCard: {
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-end',
    marginStart: '20%',
    marginBottom: '10%',
  },
  rideStatusText: {
    textAlign: 'center',
    padding: '7%',
    fontFamily:Fonts.Lato700,
    fontSize:14,
    fontStyle:'italic'
  },

  editDeleteBtnContainer:{
    width:'20%', 
    backgroundColor:'#F2F2F0',
    justifyContent:'center',
    marginStart:'2%',
    maxHeight:'80%',
    marginTop:'2%',
    borderRadius:10
  },
  cancelBookingText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:Fonts.Lato700,
    fontSize:16,
    padding:16
  },
  cancelRideHeading:{
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
    fontFamily: Fonts.Lato700,
    marginBottom:'5%'
  },
  header:{
    minHeight: hp('23%'), 
    backgroundColor: '#00000010',
  },
  weekdays:{
    justifyContent:'center',
    color:"#000",
    fontFamily:Fonts.Lato700,
    fontSize:12,
  }

});
