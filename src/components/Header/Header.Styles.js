import {
    StyleSheet,
} from 'react-native';

import {
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2%'),
        marginTop: hp('2%')
    },
});
