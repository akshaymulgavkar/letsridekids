import { View, Text, Image } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import { Images } from "../../assets/assets.path";
import { TABS } from "../../constants/Navigation.Constants";
import { Fonts } from "../../theme/Fonts";
import {Button} from "../Button/Button";

export const VerificationModal = (props) => {

    const { setVerificationModal, navigation } = props || ''

    const handleVerifyNow = () => {
        navigation.navigate(TABS.profile)
    }
    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, justifyContent: 'center' }}>
            <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setVerificationModal(false)} />
            <Image source={Images.Verification} style={{ alignSelf: 'center' }} />
            <Text style={{ textAlign: 'center', width: '60%', fontFamily: Fonts.Lato900, fontSize: 20, alignSelf: 'center', marginTop: '5%' }}>Please verify yourself to Book/Publish ride.</Text>
            <View style={{ alignSelf: 'center', marginVertical: 15 }}>
            </View>
            <Button mainViewStyle={{ width: '80%', alignSelf: 'center', marginBottom: '5%', backgroundColor: '#00F9FF' }} text="Verify Now" onPress={() => handleVerifyNow()} />
        </View>
    )
}