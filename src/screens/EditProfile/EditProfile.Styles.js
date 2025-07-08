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
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    // alignSelf: 'center',
    marginTop: '10%',
    marginStart: '2%',
    borderColor: 'rgba(0, 249, 255, 1)',
    borderWidth: 1,
  },
  editText: {
    padding: 5,
    textAlign: 'center',
    fontFamily:Fonts.Lato700,
    color:'#26185F'
  },
  inputContainer: {
    margin: '4%',
    backgroundColor: '#fff',
    borderRadius:100,
    // borderWidth:1,
    borderColor:"#000000",
  },
  namePlaceHolder:{
    marginTop:'10%',
    fontFamily:Fonts.Lato700,
    color:'#000000'
},
dateOfBirth:{
    backgroundColor:'#fff',
    borderWidth:1
},
doneBtnContainer: {
  alignSelf:'flex-end',
  flexDirection: 'row',
  padding: 10,
  width:'30%'
},
doneBtn: {
  backgroundColor: '#00F9FF',
  width: '100%',
  justifyContent: 'center',
  borderRadius: 10,
  padding: 10,
},
doneText: {
  textAlign: 'center',
  fontFamily: Fonts.Lato700,
  color: '#26185F',
},
});
