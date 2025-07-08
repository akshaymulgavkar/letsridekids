import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

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
    logoView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoStyle: {
        height: hp("30%"),
        width: hp("30%"),
    }
});
