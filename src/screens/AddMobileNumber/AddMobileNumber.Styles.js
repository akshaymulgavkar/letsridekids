import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
    editProfileText: {
        color: '#000000',
        fontSize: 22,
        fontFamily: Fonts.Lato900,
        marginStart: '5%',
        marginTop: '5%',
        width:'60%'
      },
      inputContainer: {
        margin: '4%',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginTop:'10%'
      },
      saveBtn: {
        color: '#26185F',
        fontFamily: Fonts.Lato700,
        fontSize: 18,
      },
      btnContainer:{
        backgroundColor:'#00F9FF',
        marginTop:'20%'
      },
      resendCodeText:{
        marginTop:'10%',
        fontFamily:Fonts.Lato400,
        color:'#26185F'
    }
})