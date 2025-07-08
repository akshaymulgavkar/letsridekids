import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  seatsContainer: {
    backgroundColor: '#fff',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },

  seatsText: {
    textAlign: 'center',
    color: '#000',
    fontSize: hp('5%'),
  },
  buttonText: {
    color: '#26185F',
    fontFamily: Fonts.Lato400,
    fontSize: hp('2%'),
  },
  textContainer: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  doneBtnContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 10,
    width:'30%'
  },
  doneBtn: {
    backgroundColor: '#00F9FF',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  doneText: {
    textAlign: 'center',
    fontFamily: Fonts.Lato700,
    color: '#26185F',
  },
  dateTimeText: {
    color: '#000',
    fontSize: 20,
    fontFamily: Fonts.Lato700,
    width:'100%',
  },
  
});
