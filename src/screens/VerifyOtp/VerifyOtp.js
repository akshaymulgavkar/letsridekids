import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, logout, resendotp, verifyUser} from '../../redux/actions/User.Actions';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {Button} from '../../components';
import {styles} from './VerifyOtp.Styles'
import {Images} from '../../assets/assets.path';
import { PROFILE, TABS } from '../../constants/Navigation.Constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { TYPES } from '../../redux/actions/User.Actions';
import { VerifyMobileOtp } from '../../redux/actions/User.Actions';
import { VerifyMobile } from '../../redux/actions/Profile.Actions';

export const VerifyOtp = ({navigation, route}) => {

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_USER], state))



    const [value, setValue] = useState('');    
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

    const dispatch = useDispatch()


    const {email, type, phonenumber,countryCode} = route?.params ||''

    const handleVerifyNow=()=>{

    if (type === 'email'){
      if(value.length >=4){
        let params ={
          email:email,
          otp:value
        }
        dispatch(verifyUser(params, cancelToken.token, ()=>{navigation.navigate(TABS.profile)}))
      }
    }
    else if (type === 'mobile'){
      if(value.length >=4){
        let params ={
          otp:value
        }
        dispatch(VerifyMobileOtp(params, cancelToken.token, ()=>{navigation.navigate(TABS.profile)}))
      }
    }
    }

    const handleResendOtp=()=>{
      if (type === 'email'){
        let params ={
          email:email
        }
          dispatch(resendotp(params, cancelToken.token,()=>{}))
        }
      else if (type === 'mobile'){
        let params ={
          userMobileNo:phonenumber,
          country_code:+countryCode
        }
        dispatch(VerifyMobile(params, cancelToken.token,()=>{}))
      }
    }

  return (
    <>
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
        </TouchableOpacity>
        <Text style={styles.editProfileText}>{type === 'email' ?strings.profile.enterOtpSentOnEmail: strings.profile.enterOtpSentOnMobile}</Text>

        <SmoothPinCodeInput
            value={value}
            codeLength={4}
            onTextChange={setValue}
            autoFocus={true}
            cellStyle={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius:10,
              alignSelf:'center',
              backgroundColor:'#64748B10',
              height:60, 
              width:60
            }}
            cellSpacing={45}
            cellSize={40}
            cellStyleFocused={{
              borderColor: '#222',
            }}
            textStyle={{
              fontSize: 24,
              color: '#000',
            }}
            keyboardType="phone-pad"
            allowFontScaling={false}
            containerStyle={{
              alignSelf:'center',
              marginTop:'20%',
            }}
          />

          <TouchableOpacity onPress={()=>handleResendOtp()}>
            <Text style={styles.resendCodeText}> {strings.enterOTP.resendCode}</Text>
          </TouchableOpacity>
        <Button text={strings.enterOTP.verifyOtp} textStyle={styles.saveBtn} mainViewStyle={styles.btnContainer} onPress={()=> handleVerifyNow()} Loading={isLoading} disabled={isLoading}/>
    </SafeAreaView>
    </>
  )
}