import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  searchButtonBlue: {
    marginTop: '5%',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#00F9FF',
  },

  seatsContainer:{
    flexDirection:'row', 
    alignSelf:'center',
    width:'80%', 
    marginTop:'20%'
  },

  divider: {
    backgroundColor: '#00000040',
    height: '.5%',
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
    fontSize: 16,
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
    flexDirection: 'column',
    marginStart: '2%',
    alignItems: 'center',
    flex: 1,
    color: '#000',
    fontFamily: Fonts.Lato700,
    alignSelf:'center',
    fontSize:hp('1.7%')
  },

  searchButton: {
    backgroundColor: '#64748B21',
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  seatsText:{
    textAlign: 'center',
    color: '#000', 
    fontSize: hp('5%')
  },
  buttonText:{
    color:'#26185F', 
    fontFamily:Fonts.Lato700, 
    fontSize:hp('2%')
},
bottomRating: {
  flex: 1,
  width: '100%',
  justifyContent: 'flex-end',
  padding: 0,
  backgroundColor: '#00000050',
},
});
