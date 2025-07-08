import {StyleSheet, Text, View} from 'react-native';
import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#fff', 
    flex: 1
  },
  mainContainerStyle: {
    // elevation: 2,
    borderBottomColor: '#00000040',
    borderBottomWidth: 0.5,
    paddingBottom: '5%',
  },
  availableRidesText: {
    textAlign: 'center',
    fontFamily: Fonts.Lato700,
    fontSize: 20,
    color: '#000000',
  },
  rideDetailsCard: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderWidth:.5,
    borderColor:'#00000040',
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: {
	    width: 0,
	    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
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
  fromText: {
    color: '#26185F',
    fontSize: 17,
    fontFamily: Fonts.Lato700,
    width: '50%',
  },
  distanceText: {
    color: '#876DEE',
    marginTop:'2%'
  },
  imageContainer: {
    flexDirection:'row',
    backgroundColor:'#64748B15',
    paddingVertical:'3%',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'5%'
  },
  otherRidesText: {
    textAlign: 'center',
    marginRight:10,
    fontSize: 16,
    fontFamily: Fonts.Lato300,
  },
  SortText:{
    fontSize:18,
    fontFamily:Fonts.Lato900,
    color:'#000'
    },
  locationContainer: {
    flexDirection: 'column',
    marginStart: 10,
    marginTop: 20,
  },
  listEmptyBtn: {
    width: '30%',
    alignSelf: 'center',
    marginTop: '3%',
    backgroundColor:'#00F9FF'
  },
  listEmptyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: '3%',
    fontFamily:Fonts.Lato700,
    color:'#00000060',
    fontSize:16
  },
  listEmptyImg: {
    alignSelf: 'center',
    tintColor: '#5B3FCC80',
    marginTop: '50%',
  },
  listEmptyBtnText:{
    color:'#26185F',
    fontFamily:Fonts.Lato700,
    fontStyle:'normal',
    fontSize:16
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
  bottomRating: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 0,
    backgroundColor: '#00000050',
  },
  overlayBtn:{
    backgroundColor:'#00F9FF', 
    borderRadius:10, 
    padding:5,
    alignSelf:'center',
  },
  overlayBtnText:{
    textAlign:'center', 
    color:'#26185F',
    fontSize:15,
    fontFamily:Fonts.Lato700,
    marginHorizontal:5
  },
  sortDetailsText:{
    fontFamily:Fonts.Lato400,
    color:'#000000',
    fontSize:16
  },
  passengerText:{
    color:'#475569', 
    fontFamily:Fonts.Lato700,
    fontSize:15,
    textAlign:'center'
    // textAlignVertical:'center'
  }
});
