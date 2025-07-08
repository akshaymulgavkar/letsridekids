import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
      },
      mainView:{
        flex: 1,
        justifyContent: 'center',
      },
      Image:{
        height: wp('40%'),
        width: wp('40%'),
        alignSelf: 'center',
      },
      publishRideView:{
        alignItems: 'center',
        marginVertical: hp('1%'),
      },
      publishRideText:{
        fontSize: hp('3%'),
        color: '#000',
        fontFamily: Fonts.Lato900,        
      },
      publishSuccessText:{
        fontSize: hp('2%'),
        color: '#000',
        fontFamily: Fonts.Lato400,
        opacity: 0.6,
        marginVertical: hp('1.4%'),
        textAlign: 'center',
      },
      buttonText:{
        color:'#26185F', 
        fontFamily:Fonts.Lato700, 
        fontSize:hp('2.2%')
    }
})