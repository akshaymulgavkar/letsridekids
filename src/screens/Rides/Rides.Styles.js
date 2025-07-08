import {StyleSheet} from 'react-native';
import {Fonts} from '../../theme/Fonts';
export const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headingText: {
    fontSize: 22,
    color: '#000000',
    fontFamily: Fonts.Lato900,
    padding: '2%',
  },
  tabBarHeading: {
    fontFamily: Fonts.Lato700,
    fontSize: 14,
  },
  tabView: {
    width: '95%',
    alignSelf: 'center',
    marginTop: '5%',
    // borderRadius:20
  },
  rideDetailsCard: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderColor:'#00000020',
    borderWidth:1,
    elevation:10
  },
  nameText: {
    color: '#000',
    fontFamily: Fonts.Lato700,
    fontSize: 16,
  },
  rating: {
    color: '#00000055',
    fontFamily: Fonts.Lato700,
    fontSize: 16,
    marginStart: '3%',
  },
  imageContainer: {
    alignContent: 'flex-end',
    flexDirection: 'row',
    marginTop: '4%',
  },
  locationContainer:{
    flexDirection: 'column',
    marginStart: 10,
    marginTop: 20,
  },
  fromText: {
    color: '#26185F',
    fontSize: 17,
    fontFamily: Fonts.Lato700,
    width: '80%',
  },
  dateTimeText:{
    color:'#00000080',
    fontSize:18,
    fontFamily:Fonts.Lato900
  }
});
