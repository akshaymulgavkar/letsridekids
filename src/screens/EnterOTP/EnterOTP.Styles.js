import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageBackground: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  cloudsStyles: {
    width: Dimensions.get('screen').width,
    height: Platform.OS === 'ios' ? 160 : 140,
  },
  KeyboardAvoidingViewContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: hp('4%'),
  },
  titleText: {
    fontSize: hp('3.8%'),
    color: '#FFF',
    fontFamily: Fonts.Lato900,
  },
  subtitleText: {
    fontSize: hp('2%'),
    color: '#FFF',
    fontFamily: Fonts.Lato400,
    opacity: 0.6,
    marginVertical: hp('1.4%'),
    textAlign: 'center',
    width:'80%'
  },
  root: {
    flex: 1,    
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: "15%",
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    // backgroundColor:'#3B0077',
    textAlign: 'center',
    fontFamily:Fonts.Lato700,
    color:'#fff',
    borderRadius:10,
    borderWidth:1
  },
  focusCell: {
    borderColor: '#000',
  },
});
