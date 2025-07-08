import {
    StyleSheet,
    Platform
} from 'react-native';

import {
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Fonts } from '../../theme/Fonts';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(59, 0, 119, 1)',
        paddingHorizontal: hp('2%'),
        paddingVertical: Platform.OS === "ios" ? hp('2.4%') : 0,
        borderRadius: hp('1%'),
        marginHorizontal: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputStyle: {
        flex: 1,
        paddingRight: hp('4%'),
        color: '#FFF',
        fontFamily: Fonts.Lato400,
        fontSize: hp("1.9%"),
    },
    rightViewStyle: {
        position: 'absolute',
        right: hp('2%'),
    },
    leftViewStyle: {
        position: 'absolute',
        left: hp('2%'),
    }

});
