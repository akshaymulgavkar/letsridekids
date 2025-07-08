import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  editProfileText: {
    color: '#000000',
    fontSize: 22,
    fontFamily: Fonts.Lato900,
    marginStart: '5%',
    marginTop: '5%',
  },
  placeHolderText: {
    fontSize: 16,
    fontFamily: Fonts.Lato400,
    color: '#0000040',
  },
  inputContainer: {
    margin: '2%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: hp('2%'),
    paddingVertical: Platform.OS === 'ios' ? hp('2.4%') : 0,
    borderRadius: hp('1%'),
    marginHorizontal: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    paddingRight: hp('4%'),
    color: '#FFF',
    fontFamily: Fonts.Lato400,
    fontSize: hp('1.9%'),
  },
  countryInputField: {
    fontFamily: Fonts.Lato400,
    fontSize: hp('1.9%'),
    // color:'#b12'
  },
  containerCountryPicker: {
    paddingVertical: Platform.OS === 'ios' ? hp('1.4%') : 0,
    borderRadius: hp('1%'),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginHorizontal: hp('2%'),
    marginTop:'5%',
    marginVertical:8
  },
  mycountryNameStyle:{
    fontFamily:Fonts.Lato400,
    fontSize:16,
    color:'#000000',
    padding:7,
    marginStart:10,
    flex:1
  },
  myDropdownCountryTextStyle:{
    color:'#00000080',
    fontFamily:Fonts.Lato400,
    margin:10,
    fontSize:18
  },
  placeHolderStyles:{
    fontFamily:Fonts.Lato400
  }
});
