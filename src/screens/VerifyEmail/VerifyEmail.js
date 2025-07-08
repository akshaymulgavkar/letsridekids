import React from "react";
import {
    StyleSheet,
    Image,
    StatusBar,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Images } from "../../assets/assets.path";
import {Button,Divider} from "../../components";
import { strings } from "../../Localization/Localization";
import { styles } from "./VerifyEmail.Styles";

export const VerifyEmail = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'light-content'}
            />

            <Image
                source={Images.splashBackground}
                style={[StyleSheet.absoluteFill, styles.imageBackground]}
            />

            <Image
                source={Images.clouds}
                style={[StyleSheet.absoluteFill, styles.cloudsStyles]}
                resizeMode="contain"
            />

            <View style={styles.contextView}>

                <Image
                    source={Images.verifyemail}
                    style={styles.verifyemailImageStyle}
                    resizeMode="contain"
                />

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {strings.verifyemail.title}
                    </Text>

                    <Text style={styles.subtitleText}>
                        {strings.verifyemail.subtitle}
                    </Text>
                </View>

                <Divider />

                <Button
                    text={strings.verifyemail.verifynow}
                />

            </View>
        </SafeAreaView>
    )
}