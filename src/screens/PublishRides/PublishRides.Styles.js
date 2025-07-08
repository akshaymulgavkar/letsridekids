import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  searchButtonBlue: {
    marginTop: '5%',
    marginBottom: 19,
    width: '100%',
    alignSelf: 'center',
    flexDirection:'row'
  },
  wipeText:{
    width:'55%', 
    textAlign:'center',
    fontFamily:Fonts.Lato900,
    fontSize:20,
    alignSelf:'center',
    
  },
  divider: {
    backgroundColor: '#00000040',
    height: '.2%',
    marginTop: '4%',
  },
  recentSearchList: {
    alignItems: 'center',
    paddingVertical: hp('.5%'),
    flexDirection: 'row',
    width: '100%',
  },
  recentSearchText: {
    marginTop: '6%',
    color: '#00000060',
    fontFamily: Fonts.Lato400,
  },
  SwapIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },
  rideTypeText: {
    fontFamily: Fonts.Lato400,
    fontSize: hp('1.9%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headingText: {
    fontSize: hp('2.5%'),
    color: '#000',
    fontFamily: Fonts.Lato900,
    
  },

  checkboxView: {
    flexDirection: 'row',
  },
  checkboxText: {
    flexDirection: 'row',
    marginStart: '2%',
    alignItems: 'center',
    flex: 1,
    color: '#000',
    fontFamily: Fonts.Lato700,
  },

  searchButton: {
    backgroundColor: '#64748B15',
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  rideEditWarning:{ 
    fontFamily: Fonts.Lato400,
    fontSize: 15,
    color:"#00000050"
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
  overlayStyle:{
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
});
