import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, logout, resendotp, TYPES, verifyUser} from '../../redux/actions/User.Actions';
import {strings} from '../../Localization/Localization';
import {getUser} from '../..//redux/selectors/User.Selectors';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {Button,InputBox} from '../../components';
import {styles} from './AddEmail.Styles'
import {Images} from '../../assets/assets.path';
import { ScrollView } from 'react-native-gesture-handler';
import { PROFILE } from '../../constants/Navigation.Constants';
import {
  emailValidation,
  passwordValidation
} from "../../utils/Validations/Auth.Validations";
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { DropDownHolder } from '../../utils/DropDownHolder';

export const AddEmail = ({navigation}) => {

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESENDOTP], state))

    const [email,setEmail] = useState("")
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

    const dispatch = useDispatch()


    const  handleVerifyNow=()=>{
    const isEmailValid = emailValidation(email)
    
    if (isEmailValid) {
      let params ={
        email:email
      }
      dispatch(resendotp(params, cancelToken.token, ()=> navigation.navigate(PROFILE.verifyOtp,{email:email, type:'email'})))
      
    } else {
      DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please enter a valid email');
    }
    }
    
  return (
    <>
  <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
        </TouchableOpacity>
        <Text style={styles.editProfileText}>{strings.profile.pleaseAddYourEmail}</Text>

        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.login.emailPlaceholder}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />

        <Button text={strings.enterOTP.verifyOtp} textStyle={styles.saveBtn} mainViewStyle={styles.btnContainer} onPress={()=> handleVerifyNow()} Loading={isLoading} disabled={isLoading}/>
    </SafeAreaView>
  </>
  )
}