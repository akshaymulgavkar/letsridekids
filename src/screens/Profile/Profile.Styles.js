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
    backgroundColor:'#B4A2FF40',
    marginTop:'5%'
  },
  editText:{
    fontFamily:Fonts.Lato700,
    color:'#26185F',
    left:5
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
  vehicleDetailsContainer:{
    width:'90%', 
    flexDirection:'column', 
    alignSelf:'center',
    marginTop:'2%',
    marginBottom:'4%'
  },
  vehicleNameContainer:{
    flexDirection:'row', 
    width:'100%'
  },
  vehicleDetailsRightIcon:{
    tintColor:'#00000080', 
    width:'7%'
  },
  vehicleDetailsText:{
    padding:'2%', 
    marginStart:'1%', 
    width:'63%',
    fontSize:16,
    fontFamily:Fonts.Lato400,
    color:'#00000080'
  },
  carIcon:{
    tintColor:'#000', 
    alignSelf:'flex-end',
    height: 40,
    width: 120
  },
  vehicleNumberText:{
    fontFamily:Fonts.Lato700,
    color:'#26185F',
    fontSize:14
  },
  wipeText:{
    width:'55%', 
    textAlign:'center',
    fontFamily:Fonts.Lato900,
    fontSize:20,
    alignSelf:'center',
    color:'#000'
  },
  overlayStyle:{
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
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
});
