import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#00000010',
        width:'90%', 
        alignSelf:'center',
        borderTopEndRadius:10,
        borderTopStartRadius:10,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        marginTop:'5%'
        
    },
    questionText:{
        color:'#000',
        fontFamily:Fonts.Lato700,
        fontSize:16,
        padding:'5%',
        marginStart:'5%'
    },
    answerText:{
        color:'#000',
        fontFamily:Fonts.Lato400,
        fontSize:16,
        padding:"5%",
        justifyContent:'center'
    }
});
