import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: '#fff'},
  routeText: {
    fontFamily: Fonts.Lato700,
    color: '#26185F',
    fontSize: 16,
  },
  fromText: {
    color: '#26185F',
    fontSize: 16,
    fontFamily: Fonts.Lato700,
    width: '80%',
    marginTop:3
  },
  distanceText: {
    color: '#876DEE',
    marginTop:4,
    fontFamily:Fonts.Lato400,
    fontSize:14
  },
  upperContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
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
  },
  Divider: {
    backgroundColor: '#00000010',
    height: '.50%',
    width: '100%',
    alignSelf: 'center',
  },
  dateTimeHeading:{
    color:'#000',
    fontFamily:Fonts.Lato700,
    fontSize:hp('2%'),
    marginTop:'5%',
  },
  dateTimeText:{
    color:'#00000060',
    fontFamily:Fonts.Lato400,
    fontSize:hp('2%'),
    marginTop:'2%',
  },
  lowerContainer:{
    flexDirection: 'row',
    marginTop: '7%',
  },
  detailsContainer:{
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
  pickLocationText:{
    width: '60%', 
   color: '#000000', 
   opacity:0.8, 
   fontSize: 16,
   fontFamily: Fonts.Lato700,
 },
 pickStopsLocationText: {
  width: '60%',
  color: '#00000070',
  fontSize: 16,
  fontFamily: Fonts.Lato400,
},
 pickLocationTimeText:{
  width: '30%', 
 color: '#000', 
 opacity:0.8, 
 fontSize:16,
 textAlign:'right',
 fontFamily:Fonts.Lato400
},
profileImage:{
  marginStart: 10,
  marginTop: 10,
  height: 45,
  width: 45,
  borderRadius: 100,
},
BookBtn:{
  backgroundColor: '#fff',
  width: '100%',
  height: '10%',
  borderTopWidth: 0.4,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  borderColor: '#00000020',
  elevation: 2,
},
DateTimeContainer:{
  flexDirection: 'row',
  width: '100%',
  alignSelf: 'center',
  marginTop: '8%',
},
stopOverContainer:{
  flexDirection: 'row',
  width: '100%',
  alignSelf: 'center',
  marginTop: '8%',
},
destinationContainer:{
  flexDirection: 'row',
  width: '100%',
  alignSelf: 'center',
  marginTop: '7%',
},
bottomRating: {
  flex: 1,
  width: '100%',
  justifyContent: 'flex-end',
  padding: 0,
  backgroundColor: '#00000050',
},
monthFormat: {
  width: '100%',
  color: '#000',
  fontFamily: Fonts.Lato400,
  fontSize:20
},
})
