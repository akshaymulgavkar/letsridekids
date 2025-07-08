import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  heading: {
    color: '#000000',
    fontFamily: Fonts.Lato700,
    fontSize: 18,
  },
  inputContainer: {
    margin: '4%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  header: {
    paddingBottom: '2%',
  },
  divider: {
    height: 1,
    backgroundColor: '#00000020',
    width: '90%',
    alignSelf: 'center',
  },
  placeHolderText: {
    fontSize: 16,
    fontFamily: Fonts.Lato400,
    color: '#0000040',
  },
  saveBtn: {
    color: '#26185F',
    fontFamily: Fonts.Lato700,
    fontSize: 18,
  },
  btnContainer:{
    backgroundColor:'#00F9FF',
    marginTop:'5%'
  }
});
