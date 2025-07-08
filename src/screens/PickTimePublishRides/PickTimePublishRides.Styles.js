import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  searchButtonBlue: {
    marginTop: '5%',
    marginBottom: 19,
    width: '100%',
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: '#00000040',
    height: '.2%',
    marginTop: '4%',
  },
  recentSearchList: {
    alignItems: 'center',
    paddingVertical: hp('.5%'),
    flexDirection: 'row',
    width: '100%',
  },
  recentSearchText: {
    marginTop: '6%',
    color: '#00000060',
    fontFamily: Fonts.Lato400,
  },
  SwapIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  rideTypeText: {
    fontFamily: Fonts.Lato400,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headingText: {
    fontSize: hp('2.5%'),
    color: '#000',
    fontFamily: Fonts.Lato900,
  },

  checkboxView: {
    flexDirection: 'row',
  },
  checkboxText: {
    flexDirection: 'row',
    marginStart: '2%',
    alignItems: 'center',
    flex: 1,
    color: '#000',
    fontFamily: Fonts.Lato700,
  },

  searchButton: {
    backgroundColor: '#64748B21',
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },

  dateCardChecked: {
    backgroundColor: '#00F9FF35',
    height: '100%',
    marginStart: wp("3%"),
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  dateCardUnChecked: {
    backgroundColor: '#00000020',
    height: '100%',
    marginStart: wp("3%"),
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  dateText: {
    textAlign: 'center', 
    alignSelf: 'center', 
    padding: 10,
    fontFamily:Fonts.Lato400,
    color:'#26185F'
  },
  dateContainer: {
    width: wp('95%'), 
    height:hp('5.5%'),
    alignSelf: 'center'},

  dateTimeContainer:{
    width: '90%', 
    alignSelf: 'center', 
    marginTop: '40%'
  },
  buttonContainer:{
    bottom: '10%',
    position: 'absolute',
    width: '80%',
    backgroundColor: '#00F9FF',
    alignSelf: 'center',
  }
  },
);
