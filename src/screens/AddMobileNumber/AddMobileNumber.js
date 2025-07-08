import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {Button} from '../../components';
import {styles} from './AddMobileNumber.Styles'
import {Images} from '../../assets/assets.path';
import { PROFILE } from '../../constants/Navigation.Constants';
import PhoneInput from 'react-native-phone-number-input';
import { TYPES, VerifyMobile } from '../../redux/actions/Profile.Actions';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { DropDownHolder } from '../../utils/DropDownHolder';

export const AddMobileNumber = ({navigation}) => {

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_MOBILE], state))
  

  const [phonenumber, setphonenumber] = useState('')
  const [countryCode, setcountry_code] = useState('1')
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

  const dispatch = useDispatch()


  const handleValidation =()=>{
    if (phonenumber.length<=3){
      DropDownHolder.dropDown.alertWithType('error', 'Error', "Please enter a valid mobile number")
      return false
    }
    else return true
  }

  const handleVerifyNow=()=>{

    const isValid = handleValidation()

    try {
    if (isValid){
      let params ={
        userMobileNo:phonenumber,
        country_code:+countryCode
      }
      dispatch(VerifyMobile(params, cancelToken.token, ()=>{
        navigation.navigate(PROFILE.verifyOtp, {type:'mobile', phonenumber:phonenumber, countryCode:countryCode})
      }))
    }
    } catch (error) {
      console.log('error', error)
    }
    
  }
  return (
    <>
        <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
        </TouchableOpacity>

        <Text style={styles.editProfileText}>{strings.profile.pleaseAddYourMobile}</Text>
          
        <PhoneInput
            containerStyle={{
              alignSelf:'center',
              width: '90%',
              borderRadius: 10,
              marginTop: '10%',
              borderWidth: 1,
              borderColor: '#B7B7B7',
              backgroundColor: '#64748B20',
              height: 60,
            }}
            // disableArrowIcon
            textContainerStyle={{
              backgroundColor: 'transparent',
              borderLeftWidth: 1,
              borderColor: '#B7B7B7',
              paddingVertical: 0,
            }}
            codeTextStyle={{
              fontSize: 18,
            }}
            textInputStyle={{
              fontSize: 18,
            }}
            defaultValue={phonenumber}
            defaultCode="US"
            onChangeText={text => {
              setphonenumber(text.replace(/\D/g, ''));
            }}
            onChangeCountry={text => {
              setcountry_code(text?.callingCode[0]);
            }}
            autoFocus
          />
        <Button text={strings.enterOTP.verifyOtp} textStyle={styles.saveBtn} mainViewStyle={styles.btnContainer} onPress={()=> handleVerifyNow()} Loading={isLoading} disabled={isLoading}/>
    </SafeAreaView>
    </>
  )
}