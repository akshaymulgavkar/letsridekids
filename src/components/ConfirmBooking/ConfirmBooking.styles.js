import { StyleSheet } from "react-native";
import { Fonts } from "../../theme/Fonts";

export const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 30,
        borderTopColor:'#00000015',
        borderTopWidth:1,
        paddingTop:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    declineBtn: {
        backgroundColor: '#00000040',
        width: '45%',
        borderRadius: 10
    },
    acceptBtn: {
        backgroundColor: '#00F9FF',
        width: '45%',
        borderRadius: 10
    },
    declineBtnText: {
        fontSize: 18,
        alignSelf: 'center',
        padding: 20,
        fontFamily: Fonts.Lato700,
        color: '#000000'
    },
    acceptBtnText: {
        fontSize: 18,
        alignSelf: 'center',
        padding: 20,
        fontFamily: Fonts.Lato700,
        color: '#26185F'
    },
    messageContainer: { 
        backgroundColor: '#00000010', 
        width: '90%', 
        alignSelf: 'flex-start', 
        marginStart: 10,
        marginTop:20, 
        padding:10,
        borderRadius:8,
        // elevation:10
     },
     nameText:{
        fontFamily:Fonts.Lato700
     },
    messageText:{
         color:'#000000',
         fontFamily:Fonts.Lato400,
         fontSize:16,
     },
     timeText:{
        alignSelf:'flex-end',
        fontFamily:Fonts.Lato300,
        color:'#000000',
        fontSize:14,
     },
     fromToText: {
        fontSize: 16,
        color: '#00000080',
        fontFamily: Fonts.Lato400,
      },
      fromText: {
        color: '#26185F',
        fontSize: 16,
        fontFamily: Fonts.Lato700,
        width: '80%',
        marginTop:3
      },
      distanceText: {
        color: '#876DEE',
        marginTop:4,
        fontFamily:Fonts.Lato400,
        fontSize:14
      },
      lowerContainer:{
        flexDirection: 'row',
        marginBottom: '4%',
        marginTop: '7%',
      },
      locationContainer:{ 
        flexDirection: 'column', 
        width: '100%' 
    },
    WaitText:{
      color:'#000000',
      fontFamily:Fonts.Lato400, 
      fontSize:14,
      textAlign:'center'
  },
  WaitTextContainer:{
    width:'80%', 
    backgroundColor:'#64748B10', 
    alignSelf:"center", 
    marginTop:'15%', 
    padding:15, 
    justifyContent:'center', 
    borderRadius:30
  }
})
