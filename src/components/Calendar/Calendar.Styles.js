import {Fonts} from '../../theme/Fonts';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  monthFormat: {
    width: '100%',
    color: '#000',
    fontFamily: Fonts.Lato400,
    fontSize:20
  },
  weekdays:{
    textAlign: 'center',
    color: '#000',
    fontFamily: Fonts.Lato700,
  },
  dateContainer:{ 
    backgroundColor:'#b12', 
    height:hp("5")
  },
  mainViewStyle:{
    width:'80%',
    backgroundColor: '#00F9FF',
    alignSelf: 'center',
    fontSize:hp('1.8%'),
    marginBottom:'5%'
  },
  buttonContainer:{
    // bottom: '10%',
    // position: 'absolute',
    // width: '100%',
    // backgroundColor:'#fff',
  },
  selectDaysText:{
    padding:'2%',
    fontFamily:Fonts.Lato700,
    fontSize:16,
    color:'#333333'
  },
  weekdaysBackground:{
    // flex: 1, 
    padding:"2.6%",

    borderRadius:50,
    // height:"100%"
  }
});
