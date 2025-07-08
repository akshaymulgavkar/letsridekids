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
    marginStart:'5%',
    marginTop:'4%',
    marginBottom:'1%'
  },

  checkboxView: {
    flexDirection: 'row',
  },
  checkboxText: {
    flexDirection: 'row',
    marginStart: '2%',
    // justifyContent: 'center',
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
  amPmContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    marginBottom: '10%',
  },
  amPmSelected: {
    color: '#26185F',
    fontSize: 18,
    padding:8
  },
  amPmUnSelected: {
    color: '#00000070',
    fontSize: 18,
    padding:8
  },
});
