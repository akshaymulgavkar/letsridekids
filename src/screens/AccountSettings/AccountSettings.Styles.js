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
      accountSettingsText: {
        color: '#000000',
        fontSize: 22,
        fontFamily: Fonts.Lato900,
        marginStart:'5%', 
        marginTop:'5%'
      },
      buttonStyles:{
        backgroundColor:'#fff',
      },
      buttonText:{
        fontFamily:Fonts.Lato400,
        color:'#000000',
        fontSize:18
      },
      rightIcon:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginEnd:'4%'
      },
      toggleContainer:{
        marginStart:10, 
        // marginTop:10,
        marginVertical: hp('1%'),
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    overlayStyle:{
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      padding: 0,
      backgroundColor: '#00000050',
    },
    wipeText:{
      width:'55%', 
      textAlign:'center',
      fontFamily:Fonts.Lato900,
      fontSize:20,
      alignSelf:'center',
      color:'#000'
    },
    overlayBtn:{
      backgroundColor:'#00F9FF', 
      width:'80%', 
      borderRadius:10, 
      padding:12,
      alignSelf:'center',
      margin:'7%'
    },
    overlayBtnText:{
      textAlign:'center', 
      padding:5, 
      color:'#26185F',
      fontSize:18,
      fontFamily:Fonts.Lato700
    },
})
