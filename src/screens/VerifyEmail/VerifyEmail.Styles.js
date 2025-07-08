import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { Fonts } from '../../theme/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    imageBackground: {
        flex: 1,
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
    },
    cloudsStyles: {
        width: Dimensions.get("screen").width,
        height: Platform.OS === "ios" ? 160 : 140,
    },
    contextView: {
        flex: 1,
        justifyContent: 'center'
    },
    verifyemailImageStyle: {
        height: wp('40%'),
        width: wp('40%'),
        alignSelf: 'center'
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: hp('1%'),
    },
    titleText: {
        fontSize: hp("3%"),
        color: '#FFF',
        fontFamily: Fonts.Lato900
    },
    subtitleText: {
        fontSize: hp("2%"),
        color: '#FFF',
        fontFamily: Fonts.Lato400,
        opacity: 0.6,
        marginVertical: hp('1.4%'),
        textAlign: 'center',
    },
});
