import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  headingText: {
    fontSize: hp('3.5%'),
    color: '#FFF',
    fontFamily: Fonts.Lato900,
  },
  filterView: {
    flex: 1,
    backgroundColor: '#FFF',
    elevation: 2,
    borderRadius: 20,
    width: '90%',
    padding: 10,
    alignSelf: 'center',
  },
  checkboxView: {
    alignSelf:'flex-start',    
    marginTop: '5%',
    flexDirection: 'row',
  },
  checkboxText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#64748B15',
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  searchButtonBlue: {
    marginTop: '5%',
    marginBottom: 19,
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#00F9FF"
  },
  headingContainer: {
    height: '30%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },

  bottomSheetContainer: {
    backgroundColor: '#fff',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  dateTimeText: {
    color: '#000',
    fontSize: 20,
    fontFamily: Fonts.Lato700,
  },
  doneBtnContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 10,
  },
  doneBtn: {
    backgroundColor: 'rgba(143, 252, 255, 1)',
    width: '45%',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  doneText: {
    textAlign: 'center',
    fontFamily: Fonts.Lato700,
    color: '#26185F',
  },
  timeScrollContainer: {
    flex: 0.06,
    flexDirection: 'row',
    marginVertical: '5%',
  },
  timeSelected: {
    backgroundColor: '#00F9FF30',
    borderRadius: 5,
    margin: 8,
  },
  timeUnselected: {
    backgroundColor: '#00000018',
    borderRadius: 5,
    margin: 8,
  },
  timeTextSelected: {
    color: '#26185F',
    padding: 15,
    fontFamily: Fonts.Lato400,
  },
  timeTextUnselected: {
    color: '#000000',
    padding: 15,
    fontFamily: Fonts.Lato400,
  },
  amPmContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    marginBottom: '10%',
  },
  amPmSelected: {
    color: '#26185F',
    fontSize: 18,
  },
  amPmUnSelected: {
    color: '#00000070',
    fontSize: 18,
  },
  mainContainer:{
    flex: 1,
    minHeight: Dimensions.get('screen').height * 0.84,
  },
  rightIcon:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  overlayStyle:{
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
  wipeText:{
    width:'55%', 
    textAlign:'center',
    fontFamily:Fonts.Lato900,
    fontSize:20,
    alignSelf:'center',
    
  },
  overlayBtn:{
    backgroundColor:'#00F9FF', 
    width:'80%', 
    borderRadius:10, 
    padding:12,
    alignSelf:'center',
    margin:'7%'
  },
  overlayBtnText:{
    textAlign:'center', 
    padding:5, 
    color:'#26185F',
    fontSize:18,
    fontFamily:Fonts.Lato700
  },
  bottomRating: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
  btnText:{
    width: '80%', 
    fontFamily: Fonts.Lato400, 
    fontSize:16
  }, 
  searchBtnText:{
    alignSelf:'center',
    color:'#26185F',
    fontFamily:Fonts.Lato700,
    fontSize:18
  } 
});