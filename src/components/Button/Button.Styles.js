import {
    StyleSheet,
} from 'react-native';

import {
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Fonts } from '../../theme/Fonts';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: hp('2%'),
        alignItems: 'center',
        backgroundColor: 'rgba(143, 252, 255, 1)',
        paddingVertical: hp('2%'),
        borderRadius: hp('1%'),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerLeft: {
        backgroundColor: 'rgba(143, 252, 255, 1)',
        paddingVertical: hp('2%'),
        borderRadius: hp('1%'),
        flexDirection: 'row',
    },
    textStyles: {
        fontSize: hp("1.9%"),
        fontFamily: Fonts.Lato700,
        color: 'rgba(38, 24, 95, 1)',
        marginHorizontal: hp('1%'),
       fontFamily:Fonts.Lato700
    }
});
