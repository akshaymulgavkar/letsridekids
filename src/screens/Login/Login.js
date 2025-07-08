import React, {
    useState, useEffect
} from "react";
import {
    View,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Linking
} from "react-native";

import {
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useDispatch,
    useSelector
} from "react-redux";
import axios from "axios";

import { Images } from "../../assets/assets.path";
import { strings } from "../../Localization/Localization";
import { styles } from "./Login.Styles";
import {InputBox,Divider,Button} from "../../components";
import { NAVIGATION } from "../../constants/Navigation.Constants";
import {
    emailValidation,
    passwordValidation
} from "../../utils/Validations/Auth.Validations";
import { login, SingUpWithGoogle, SignUpWithFaceBook, SignUpWithApple, TYPES, resendotp } from "../../redux/actions/User.Actions";
import { isLoadingSelector, successSelector } from "../../redux/selectors/Status.Selectors";

import Entypo from 'react-native-vector-icons/Entypo';
import { Fonts } from "../../theme/Fonts";
import { DropDownHolder } from "../../utils/DropDownHolder";
import { Icon } from "@rneui/base";

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureEntry, setSecureEntry] = useState(true);
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
    const [validate, setValidate] = useState({
        emailError: null,
        passwordError: null,
    });
    const [checkBox, setCheckBox] = useState(false)
    const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));
    const isLoadingSocialLogin = useSelector((state) => isLoadingSelector([TYPES.SOCIALLOGIN], state))

    const dispatch = useDispatch();

    const [socialLoading, setSocialLoading] = useState({
        appple: false,
        google: false,
        facebook: false
    })

    useEffect(() => {
        if (!isLoadingSocialLogin) {
            setSocialLoading({
                appple: false,
                google: false,
                facebook: false
            })
        }
    }, [isLoadingSocialLogin])

    const handleVerifyUser = () => {
        dispatch(resendotp({ email: email }, cancelToken.token, () => { }))
        navigation.navigate(NAVIGATION.verifyUser, { email: email })
    }

    const handleSocialLogin=(method, setLoading)=>{
        if (!checkBox) DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please agree to terms and conditions')
        else if (checkBox) {dispatch(method)
        setSocialLoading(setLoading)}
        
    }

    const handleEmailValidation = value => {
        const emailError = emailValidation(value);
        console.log('email error is', emailError)
        if (!emailError) {
            setValidate({
                emailError: false,
                passwordError: validate.passwordError,
            })
            return false
        } else {
            setValidate({
                emailError: true,
                passwordError: validate.passwordError,
            });
            return true
        }
    };

    const handlePasswordValidation = value => {
        const passwordError = passwordValidation(value);
        if (!passwordError) {
            setValidate({
                emailError: validate.emailError,
                passwordError: false,
            });
            return false
        } else {
            setValidate({
                emailError: validate.emailError,
                passwordError: true,
            });
            return true
        }
    };

    const urls ={
        tnc:'https://letsridekids.com/terms-conditions/',
        privacyPolicy:'https://letsridekids.com/privacy-policy/',
      }

    const handleSubmit = async () => {
        Keyboard.dismiss()

        const emailValidation = handleEmailValidation(email)
        const passwordValidation = handlePasswordValidation(password)

        let params = {
            email,
            password
        }
        if (email.length && password.length >= 6 && emailValidation & passwordValidation) {
            dispatch(login(params, cancelToken.token, () => handleVerifyUser()))
        } else {
            if (validate.emailError === "Please enter a valid email address") {
                DropDownHolder.dropDown.alertWithType('error', 'Error', validate.emailError);
            }
            else if (emailValidation == false) {
                DropDownHolder.dropDown.alertWithType('error', 'Error', strings.login.invalidEmail);
            }
            else if (validate.passwordError == "Password must be at least 6 characters") {
                DropDownHolder.dropDown.alertWithType('error', 'Error', validate.passwordError);
            }
            else if (!email.length) {
                DropDownHolder.dropDown.alertWithType('error', 'Error', strings.login.emailRequired);
            }
            else if (!password.length) {
                DropDownHolder.dropDown.alertWithType('error', 'Error', strings.login.passwordRequired);
            }
            else if (password.length > 0 && password.length <= 6) {
                DropDownHolder.dropDown.alertWithType('error', 'Error', "Password must be at least 6 characters");
            }
        }
    }


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

            <KeyboardAvoidingView
                style={styles.KeyboardAvoidingViewContainer}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    overScrollMode='never'
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {strings.login.title}
                        </Text>

                        <Text style={styles.subtitleText}>
                            {strings.login.subtitle}
                        </Text>
                    </View>

                    <InputBox
                        placeholder={strings.login.emailPlaceholder}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        keyboardType="email-address"
                        rightIcon={
                            <Entypo
                                name="email"
                                size={hp('2.5%')}
                                color="rgba(255, 255, 255, 0.4)"
                            />
                        }
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        editable={!isLoading}
                    />

                    <Divider />

                    <InputBox
                        secureTextEntry={secureEntry}
                        placeholder={strings.login.passwordPlaceholder}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        rightIcon={
                            <Entypo
                                onPress={() => setSecureEntry(!secureEntry)}
                                name={secureEntry ? "eye" : "eye-with-line"}
                                size={hp('2.5%')}
                                color="rgba(255, 255, 255, 0.4)"
                            />
                        }
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        editable={!isLoading}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(NAVIGATION.forgotpassword);
                        }}
                        disabled={isLoading}
                        style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>{strings.login.forgotPassword}</Text>
                    </TouchableOpacity>

                    <Divider />

                    <Button
                        text={strings.login.login}
                        onPress={() => {
                            handleSubmit();
                        }}
                        disabled={isLoadingSocialLogin || isLoading}
                        Loading={isLoading}
                    />

                    <Divider />

                    <TouchableOpacity activeOpacity={1} disabled={isLoading} onPress={() => {
                        navigation.navigate(NAVIGATION.signup);
                    }} style={styles.donthaveAccountContainer}>
                        <Text style={styles.donthaveAccountText}>{strings.login.dontHaveAccount} <Text
                            style={styles.signupText}>{strings.login.signUp}</Text></Text>
                    </TouchableOpacity>

                    <Divider mainViewStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.14)',
                        marginVertical: hp('2%'),
                        height: hp('0.1%'),
                        marginHorizontal: hp('1%'),
                        marginTop: hp('3%'),
                    }} />

                    <Button
                        onPress={() => {
                            handleSocialLogin(SignUpWithApple(),{
                                appple: true,
                                google: false,
                                facebook: false
                            } )
                        }}
                        text={strings.sociallogin.apple}
                        leftIconEnable={true}
                        leftIcon={
                            <Image
                                source={Images.appleLogo}
                                style={styles.socialLoginImages}
                                resizeMode="contain"
                            />
                        }
                        mainViewStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                        }}
                        textStyle={{
                            // color: '#FFF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disabled={isLoadingSocialLogin || isLoading}
                        Loading={socialLoading.appple}
                    />

                    <Divider />

                    <Button
                        onPress={() => {
                            handleSocialLogin(SingUpWithGoogle(),{
                                appple: false,
                                google: true,
                                facebook: false
                            })
                        }}
                        text={strings.sociallogin.google}
                        leftIconEnable={true}
                        leftIcon={
                            <Image
                                source={Images.googleLogo}
                                style={styles.socialLoginImages}
                                resizeMode="contain"
                            />
                        }
                        mainViewStyle={{
                            backgroundColor: 'rgba(255, 83, 83, 0.99)',
                        }}
                        textStyle={{
                            color: '#FFF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disabled={isLoadingSocialLogin || isLoading}
                        Loading={socialLoading.google}
                    />

                    <Divider />

                    <Button
                        onPress={() => {
                            handleSocialLogin(SignUpWithFaceBook(),{
                                appple: false,
                                google: false,
                                facebook: true
                            })
                        }}
                        text={strings.sociallogin.facebook}
                        leftIconEnable={true}
                        leftIcon={
                            <Image
                                source={Images.facebookLogo}
                                style={styles.socialLoginImages}
                                resizeMode="contain"
                            />
                        }
                        mainViewStyle={{
                            backgroundColor: 'rgba(24, 119, 242, 1)',
                        }}
                        textStyle={{
                            color: '#FFF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disabled={isLoadingSocialLogin || isLoading}
                        Loading={socialLoading.facebook}
                    />

                    <View style={{flexDirection:'row', alignSelf:'center', marginVertical:15, width:'85%'}}>
                        <Icon name={checkBox?'checkbox-marked-outline':'checkbox-blank-outline'} type="material-community" onPress={()=>setCheckBox(!checkBox)} size={30}/>
                        <Text style={styles.agreementText}>I agree to <Text style={{textDecorationLine:'underline', fontWeight:'bold'}} onPress={()=>Linking.openURL(urls.tnc)}>Terms and Conditions</Text> and <Text style={{textDecorationLine:'underline', fontWeight:'bold'}}onPress={()=>Linking.openURL(urls.privacyPolicy)} >Privacy Policy</Text> of LetsRideKids</Text>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}