import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, StatusBar, Platform, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard, Linking} from "react-native";
import axios from "axios";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import { Images } from "../../assets/assets.path";
import { strings } from "../../Localization/Localization";
import { styles } from "./SignUp.Styles";
import {InputBox,Divider,Button} from "../../components";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NAVIGATION } from "../../constants/Navigation.Constants";
import { DropDownHolder } from "../../utils/DropDownHolder";

import { useDispatch, useSelector} from "react-redux";
import { isLoadingSelector } from "../../redux/selectors/Status.Selectors";
import {  signup, SignUpWithApple, SignUpWithFaceBook, SingUpWithGoogle, TYPES } from "../../redux/actions/User.Actions";
import { emailValidation, passwordValidation, nameValidation} from "../../utils/Validations/Auth.Validations";
import { Icon } from "@rneui/base";

export const SignUp = ({ navigation }) => {

    const isLoadingSocialLogin = useSelector((state)=> isLoadingSelector([TYPES.SOCIALLOGIN], state))

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullName] = useState("")
    const [secureEntry, setSecureEntry] = useState(true);
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
    const [validate, setValidate] = useState({emailError: null,passwordError: null,nameError:null});
    const [checkBox, setCheckBox] = useState(false)
    
    const isLoading = useSelector((state) => isLoadingSelector([TYPES.SIGNUP], state));

    const dispatch = useDispatch();

    const [socialLoading , setSocialLoading] = useState({
        appple:false, 
        google:false,
        facebook:false
    })

    useEffect(() => {
      if (!isLoadingSocialLogin){
        setSocialLoading({
            appple:false, 
            google:false,
            facebook:false
         })
      }
    }, [isLoadingSocialLogin])

    const handleSubmit = async () => {

        const nameValidation = handleNameValidation(fullname)
        const passwordValidation = handlePasswordValidation(password)
        const emailValidation = handleEmailValidation(email)
        Keyboard.dismiss()

        let params = {
            email,
            password,
            fullname
        }
        if (email.length && password.length >= 6 && fullname.length && nameValidation && passwordValidation && emailValidation && checkBox) {
            
            dispatch(signup(params, cancelToken.token, ()=>{
            navigation.navigate(NAVIGATION.verifyUser, {email:email})    
            }))

        } else {
        if(fullname.length < 3 || fullname.length >25){
                DropDownHolder.dropDown.alertWithType('error','Error',"Name should be at least 3 characters and at max 25 characters")
            }
         else if (validate.emailError == "Please enter a valid email address") {
                DropDownHolder.dropDown.alertWithType('error', 'Error', validate.emailError);
            }
          else  if (validate.passwordError == "Password must be at least 6 characters") {
                DropDownHolder.dropDown.alertWithType('error', 'Error', validate.passwordError);
            }
         else   if(!email.length){
                DropDownHolder.dropDown.alertWithType('error', 'Error', strings.login.emailRequired);
            }
        else   if(email.length>30){
                DropDownHolder.dropDown.alertWithType('error', 'Error', "Email must be at max 30 characters");
            }
         else   if(!password.length){
                DropDownHolder.dropDown.alertWithType('error', 'Error', strings.login.passwordRequired);
            }
         else   if(password.length <= 6 || password.length>12){
                DropDownHolder.dropDown.alertWithType('error', 'Error', "Password must be at least 6 characters and at max 12 characters");
            }
         else   if(!fullname.length){
                DropDownHolder.dropDown.alertWithType('error', 'Error',"Please enter a name")
            }
         else   if(validate.nameError == "Please enter a valid name"){
                DropDownHolder.dropDown.alertWithType('error', 'Error',"Please enter a valid name")
            }
        else   if(!checkBox){
                DropDownHolder.dropDown.alertWithType('error', 'Error',"Please agree to terms and conditions")
            }
        }
    }

    const handleNameValidation = value =>{
        const nameError = nameValidation(value);

        if(!nameError){
            // DropDownHolder.dropDown.alertWithType('error', 'Error', "Please enter a valid name")
            setValidate({
                nameError:"Please enter a valid name",
                passwordError:validate.passwordError,
                emailError:validate.emailError
            })

            return false
        } else {
            setValidate({
                emailError:validate.emailError,
                passwordError:validate.passwordError,
                nameError:true
            })
            return true
        }
    }

    const handleEmailValidation = value => {
        
        const emailError = emailValidation(value);

        if (!emailError) {
            // DropDownHolder.dropDown.alertWithType('error', 'Error', "Please enter a valid email address");
            setValidate({
                emailError: "Please enter a valid email address",
                passwordError: validate.passwordError,
                nameError:validate.nameError
            })
            return false
        } else {
            setValidate({
                emailError: true,
                passwordError: validate.passwordError,
                nameError:validate.nameError
            })
            return true
        }
    };

    const handlePasswordValidation = value => {
        const passwordError = passwordValidation(value);
        if (!passwordError) {
            // DropDownHolder.dropDown.alertWithType('error', 'Error', "Password must be at least 6 characters");
            setValidate({
                emailError: validate.emailError,
                nameError:validate.nameError,
                passwordError: false,
            })
            return false
        } else {
            setValidate({
                emailError: validate.emailError,
                passwordError: true,
                nameError:validate.nameError
            });
            return true
        }
    };

    const handleSocialLogin=(method, isLoading)=>{
        console.log({checkBox}, {method})
        if (!checkBox) DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please agree to terms and conditions')
        else if (checkBox) {dispatch(method) 
            setSocialLoading(isLoading)}
        
    }

    const urls ={
        tnc:'https://letsridekids.com/terms-conditions/',
        privacyPolicy:'https://letsridekids.com/privacy-policy/',
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
                            {strings.signup.title}
                        </Text>

                        <Text style={styles.subtitleText}>
                            {strings.signup.subtitle}
                        </Text>
                    </View>

                    <InputBox
                        placeholder={strings.signup.fullnamePlaceholder}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        rightIcon={
                            <FontAwesome5
                                name="user-alt"
                                size={hp('2.5%')}
                                color="rgba(255, 255, 255, 0.4)"
                            />
                        }
                        value ={fullname}
                        onChangeText={(text)=>setFullName(text)}
                        editable={!isLoading}
                    />

                    <Divider />

                    <InputBox
                        placeholder={strings.signup.emailPlaceholder}
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        keyboardType="email-address"
                        rightIcon={
                            <Entypo
                                name="email"
                                size={hp('2.5%')}
                                color="rgba(255, 255, 255, 0.4)"
                            />
                        }
                        value = {email}
                        onChangeText={(text)=>setEmail(text)}
                        editable={!isLoading}
                    />

                    <Divider />

                    <InputBox
                        secureTextEntry={secureEntry}
                        placeholder={strings.signup.passwordPlaceholder}
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
                        onChangeText={(text)=>setPassword(text)}
                        editable={!isLoading}
                    />

                    <Divider mainViewStyle={{
                        marginVertical: hp('2%'),
                    }} />

                    <Button
                        disabled={isLoading}
                        Loading={isLoading}
                        onPress={()=>handleSubmit()}
                        text={strings.signup.signup}
                    />

                    <Divider />

                    <TouchableOpacity disabled={isLoading} onPress={() => {
                        navigation.navigate(NAVIGATION.login)
                    }} style={styles.haveAccountContainer}>
                        <Text style={styles.haveAccountText}>{strings.signup.alreadyHaveAccount} <Text
                            style={styles.loginText}>{strings.signup.login}</Text></Text>
                    </TouchableOpacity>

                    <Divider mainViewStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.14)',
                        marginVertical: hp('2%'),
                        height: hp('0.1%'),
                        marginHorizontal: hp('1%'),
                        marginTop: hp('3%'),
                    }} />

                    <Button
                    onPress={()=>{handleSocialLogin(SignUpWithApple(),{
                        appple:true, 
                        google:false,
                        facebook:false
                     })}}
                         disabled={isLoadingSocialLogin || isLoading}
                         Loading={socialLoading.appple}
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
                    />

                    <Divider />

                    <Button
                       onPress={() => {handleSocialLogin(SingUpWithGoogle(),{
                        appple:false, 
                        google:true,
                        facebook:false
                     })}}
                        disabled={isLoadingSocialLogin || isLoading }
                        Loading={socialLoading.google}
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
                            color: '#FFF'
                        }}
                    />

                    <Divider />

                    <Button
                        onPress={() => {handleSocialLogin(SignUpWithFaceBook(),{
                            appple:false, 
                            google:false,
                            facebook:true
                         }) }}
                        disabled={isLoadingSocialLogin || isLoading }
                        Loading={socialLoading.facebook}
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
                            color: '#FFF'
                        }}
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