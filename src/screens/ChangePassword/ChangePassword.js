import { Image, StatusBar, Text, TouchableOpacity, View, Switch,ScrollView} from 'react-native';
import React, {useState} from 'react';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button,Divider,Header,InputBox} from '../../components';
import {styles} from './ChangePassword.Styles';
import {Images} from '../../assets/assets.path';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordViaProfile, TYPES } from '../../redux/actions/Profile.Actions';
import axios from 'axios';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { TABS } from '../../constants/Navigation.Constants';

export const ChangePassword = ({navigation}) => {

  const isLoading = useSelector((state)=>isLoadingSelector([TYPES.CHANGE_PASSWORD], state))

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [secureOldPassword, setSecureOldPassword] = useState(false);
  const [secureNewPassword, setSecureNewPassword] = useState(false);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(false);

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

  const dispatch = useDispatch()

  const handlePasswordValidation=()=>{
    if (oldPassword.length<6){
      DropDownHolder.dropDown.alertWithType('error', 'Error', "Please enter valid old password")
      return false
    }
    else if (confirmPassword.length<6){
      DropDownHolder.dropDown.alertWithType('error', 'Error', "Confirm new password must be 6 digits")
      return false
    }
    else if (newPassword.length<6){
      DropDownHolder.dropDown.alertWithType('error', 'Error', "New password must be 6 digits")
      return false
    }
    else if (newPassword != confirmPassword){
    DropDownHolder.dropDown.alertWithType('error', 'Error', "New Passwords should match")
    return false
  }
  else return true
  }

  const handleSave=()=>{

    const isPasswordValid = handlePasswordValidation()

    if (isPasswordValid){
      let params ={
        oldPass:oldPassword,
        newPass:newPassword,
        confirmNewPass:confirmPassword
        }
        dispatch(ChangePasswordViaProfile(params, cancelToken.token, ()=>navigation.navigate(TABS.profile)))
    }

  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView>
          <Header
            left={
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={Images.leftArrow} style={{tintColor: '#000'}} />
              </TouchableOpacity>
            }
            center={
              <Text style={styles.heading}>
                {strings.profile.changePassword}
              </Text>
            }
            mainContainerStyle={styles.header}
          />

          <Divider mainViewStyle={styles.divider}/>

          <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.profile.oldPassword}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            rightIcon={
              <Entypo name={secureOldPassword?"eye-with-line":"eye"} size={24} color="#00000070" onPress={()=>setSecureOldPassword(!secureOldPassword)}/>
            }
            secureTextEntry={secureOldPassword}
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
            
          />

          <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.profile.newPassword}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            rightIcon={
              <Entypo name={secureNewPassword?"eye-with-line":"eye"} size={24} color="#00000070" onPress={()=>setSecureNewPassword(!secureNewPassword)}/>
            }
            secureTextEntry={secureNewPassword}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />

          <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.profile.confirmNewPassword}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            rightIcon={
              <Entypo name={secureConfirmPassword?"eye-with-line":"eye"} size={24} color="#00000070" onPress={()=>setSecureConfirmPassword(!secureConfirmPassword)}/>
            }
            secureTextEntry={secureConfirmPassword}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />

          <Button text={strings.profile.save} textStyle={styles.saveBtn} mainViewStyle={styles.btnContainer} onPress={()=>handleSave()} Loading={isLoading} disabled={isLoading}/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

