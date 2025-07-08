import { StyleSheet,Dimensions } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {Fonts} from '../../theme/Fonts';
export const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: '#fff',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
      },
      textContainer: {
        flexDirection: 'row',
        flex: 1,
        width:'95%',
        alignSelf:'center',
      },
      dateTimeText: {
        color: '#000',
        fontSize: 20,
        fontFamily: Fonts.Lato700,
        width:'100%',
      },
      doneBtnContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        width:'30%'
      },
      doneBtn: {
        backgroundColor: '#00F9FF',
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
      },
      doneText: {
        textAlign: 'center',
        fontFamily: Fonts.Lato700,
        color: '#26185F',
      },
      timeScrollContainer: {
        flex: 0.06,
        flexDirection: 'row',
        marginVertical: '5%',
      },
      timeSelected: {
        backgroundColor: '#00F9FF30',
        borderRadius: 5,
        margin: 8,
      },
      timeUnselected: {
        backgroundColor: '#00000018',
        borderRadius: 5,
        margin: 8,
      },
      timeTextSelected: {
        color: '#26185F',
        padding: 15,
        fontFamily: Fonts.Lato400,
      },
      timeTextUnselected: {
        color: '#000000',
        padding: 15,
        fontFamily: Fonts.Lato400,
      },
      amPmContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
        marginBottom: '10%',
      },
      amPmSelected: {
        color: '#26185F',
        fontSize: 22,
        padding:8
      },
      amPmUnSelected: {
        color: '#00000070',
        fontSize: 22,
        padding:8
      },
      dateCardChecked: {
        backgroundColor: '#00F9FF35',
        height: '100%',
        marginStart: wp("3%"),
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
      },
      dateCardUnChecked: {
        backgroundColor: '#00000020',
        height: '100%',
        marginStart: wp("3%"),
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
      },
      dateText: {
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
        color:'#000'
      },
      dateContainer: {
        width: wp('95%'),
        height:hp('5.5%'),
        alignSelf: 'center'},
      },
)