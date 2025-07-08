import { StyleSheet } from "react-native";
import { Fonts } from "../../theme/Fonts";

export const styles = StyleSheet.create({
    nameText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: Fonts.Lato700
    },
    message: {
        marginTop: '2%',
        color: '#00000090',
        fontFamily: Fonts.Lato400,
        fontSize: 14
    },
    messageUnread: {
        marginTop: '2%',
        color: '#000000',
        fontFamily: Fonts.Lato700,
        fontSize: 14,
        fontStyle:'italic'
    },
    timeText: {
        color: '#00000090',
        fontFamily: Fonts.Lato400,
        fontSize: 14
    },
    messageCount: {
        fontFamily: Fonts.Lato700,
        color: '#000',
        fontSize: 12,
        textAlign: 'center',
    },
    messageCountContainer: {
        backgroundColor: '#00F9FF',
        width: 10,
        height: 10,
        borderRadius: 100,
        justifyContent: 'center',
        marginTop: '15%',
        alignSelf: 'flex-end',
        marginRight: '25%'
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 12
    }
})