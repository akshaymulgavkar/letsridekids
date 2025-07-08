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
    KeyboardAvoidingViewContainer: {
        flex: 1
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: hp('7%'),
    },
    titleText: {
        fontSize: hp("3.8%"),
        color: '#FFF',
        fontFamily: Fonts.Lato900
    },
    subtitleText: {
        fontSize: hp("1.9%"),
        color: '#FFF',
        fontFamily: Fonts.Lato400,
        opacity: 0.7,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginHorizontal: hp('2%'),
        marginVertical: hp('1%'),
    },
    forgotPasswordText: {
        fontSize: hp("2%"),
        color: "rgba(143, 252, 255, 1)"
    },
    donthaveAccountContainer: {
        alignItems: 'center',
    },
    donthaveAccountText: {
        fontSize: hp("2%"),
        color: "#FFF"
    },
    signupText: {
        fontSize: hp("2%"),
        color: "rgba(143, 252, 255, 1)"
    },
    socialLoginImages: {
        height: hp('2.6%'),
        width: hp('2.6%'),
    },
    agreementText: {
        fontSize: hp("2%"),
        color: "#fff",
        marginHorizontal:10
    },
});
