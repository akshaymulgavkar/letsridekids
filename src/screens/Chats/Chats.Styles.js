import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  profileText: {
    padding: 10,
    color: '#000000',
    fontSize: 22,
    fontFamily: Fonts.Lato900,
  },
  logoutBtnContainer: {
    alignSelf: 'center',
    width: '25%',
    backgroundColor: 'rgba(0, 249, 255, 0.2)',
    marginEnd: '5%',
    borderRadius: 10,
  },
  logoutTextStyle: {
    textAlign: 'center',
    padding: '7%',
    textAlignVertical: 'center',
    fontFamily: Fonts.Lato700,
    color: '#000',
  },
  SafeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: '10%',
    borderColor: 'rgba(0, 249, 255, 1)',
    borderWidth: 1,
  },
  nameText:{
    alignSelf:'center',
    fontSize:16,
    fontFamily:Fonts.Lato700,
    color: '#000000',
    justifyContent:'space-between'
  },
  editBtn:{
    backgroundColor:'#B4A2FF80',
    marginTop:'5%'
  },
  editText:{
    fontFamily:Fonts.Lato700,
    color:'#26185F',
  },
  rightIcon:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginEnd:'4%'
  },
  Divider:{
    height:.5,
    backgroundColor:'#00000050',
    width:'95%',
    alignSelf:'center',
    // marginTop:'5%'
  },
  verifyProfileText:{
    fontSize:18,
    fontFamily:Fonts.Lato700,
    color: '#000000',
    padding:10
  },
  profileBtnText:{
    fontSize:18,
    fontFamily:Fonts.Lato400    
  },
  editProfileBtn:{
    backgroundColor:'#fff',
    justifyContent:'flex-start'
  },
  accountSettings:{
    backgroundColor:'#fff',
    margin:1
  },
  accountSettingsText:{
    fontFamily:Fonts.Lato700,
    color:'#26185F',
    fontSize:18
  },
  bottomBtn:{
    flexDirection:'row', 
    width:'90%', 
    alignSelf:'center',
    margin:'3%'
  },
  noMessage:{
      color:'#000',
      fontFamily:Fonts.Lato700,
      fontSize:19,
      marginVertical:10
  },
  noInbox:{
      color:'#0F172A60',
      fontFamily:Fonts.Lato400,
      fontSize:17,
      // marginVertical:10
  }
});
