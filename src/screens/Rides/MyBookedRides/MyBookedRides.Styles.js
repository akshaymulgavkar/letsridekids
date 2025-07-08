import {StyleSheet} from 'react-native';
import {Fonts} from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  rideDetailsCard: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderColor: '#00000020',
    borderWidth: 1,
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
  locationContainer: {
    flexDirection: 'column',
    marginStart: 10,
    marginTop: 20,
  },
  fromText: {
    color: '#26185F',
    fontSize: 17,
    fontFamily: Fonts.Lato700,
    width: '100%',
    textAlign:'center'
  },
  dateTimeText: {
    color: '#00000080',
    fontSize: 18,
    fontFamily: Fonts.Lato900,
    marginStart: '2%',
  },
  listEmptyBtn: {
    width: '30%',
    alignSelf: 'center',
    marginTop: '3%',
    backgroundColor: '#00F9FF',
  },
  listEmptyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: '3%',
    fontFamily: Fonts.Lato700,
    color: '#00000060',
    fontSize: 16,
  },
  listEmptyImg: {
    alignSelf: 'center',
    tintColor: '#5B3FCC50',
    marginTop: '50%',
  },
  listEmptyBtnText: {
    color: '#26185F',
    fontFamily: Fonts.Lato700,
    fontStyle: 'normal',
    fontSize: 16,
  },
  rideStatusContainer: {
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rideStatusCard: {
    borderRadius: 10,
    width: '70%',
    alignSelf: 'flex-end',
    marginStart: '20%',
    marginBottom: '10%',
  },
  rideStatusText: {
    textAlign: 'center',
    padding: '7%',
    fontFamily:Fonts.Lato700,
    fontSize:14,
    fontStyle:'italic'
  },
  rideTypeContainer: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    marginStart: '5%',
    width: '65%',
    borderRadius: 10,
  },
  rideTypeText: {
    padding: 3,
    textAlign: 'center',
    fontFamily: Fonts.Lato700,
    fontSize: 12,
    color:'#000'
  },
  weekdays:{
    justifyContent:'center',
    color:"#000",
    fontFamily:Fonts.Lato700,
    fontSize:12,
  }
});
