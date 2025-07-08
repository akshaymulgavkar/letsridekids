import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  dateTimeHeading: {
    color: '#000',
    fontFamily: Fonts.Lato700,
    fontSize: hp('2%'),
    marginTop: '5%',
  },
  monthFormat: {
    width: '100%',
    color: '#000',
    fontFamily: Fonts.Lato400,
    fontSize: 20,
  },
  alreadyBookedText: {
    color: '#00000080',
    fontFamily: Fonts.Lato400,
    fontSize: 14,
    marginTop: '5%',
    marginStart: 10,
  },
  weekdays:{
    textAlign: 'center',
    color: '#000',
    fontFamily: Fonts.Lato700,
  },
  bottomRating: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
});
