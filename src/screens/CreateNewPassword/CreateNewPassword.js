import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {Images} from '../../assets/assets.path';
import {strings} from '../../Localization/Localization';
import {InputBox,Divider,Button,Header} from '../../components';
import {styles} from './CreateNewPassword.Styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {isLoadingSelector} from '../../redux/selectors/Status.Selectors';
import { NAVIGATION } from '../../constants/Navigation.Constants';
import { createNewPassword, TYPES } from '../../redux/actions/User.Actions';
import { newPasswordValidation } from '../../utils/Validations/Auth.Validations';
import {
  useDispatch,
  useSelector
} from "react-redux";
import axios from "axios";
import { DropDownHolder } from '../../utils/DropDownHolder';

export const CreateNewPassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [validate, setValidate] = useState({
    passwordError: null,
});

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FORGOTPASSWORD], state),
  );

  const dispatch = useDispatch();

  const {emailId} = route?.params || ''

  const handleNewPasswordValidation =()=>{
    const newPassworderror = newPasswordValidation(password, confirmPassword);
  if (!newPassworderror) {
      setValidate({
        passwordError:"Please enter a valid password"
      })
      return false
  } else {
      setValidate({
        passwordError: true,
      });
      return true
  }
  }


  const handleSubmit =  async ()=>{
    Keyboard.dismiss()
    const newPasswordValidation = handleNewPasswordValidation(password, confirmPassword)

    let params ={
      password:password,
      confirmPassword:confirmPassword,
      email:emailId
    }

    if (newPasswordValidation && password.length >=6 && confirmPassword.length >= 6){

      dispatch(createNewPassword(params, ()=>{
        navigation.navigate(NAVIGATION.changePasswordDone)},cancelToken))
    }else {
      // if (validate.passwordError == "Please enter a valid password") {
      //     DropDownHolder.dropDown.alertWithType('error', 'Error', validate.passwordError);
      // }
      if (password.length <= 6) {
          DropDownHolder.dropDown.alertWithType('error', 'Error', "Password must be at least 6 characters");
      }
    else  if (confirmPassword.length <= 6) {
        DropDownHolder.dropDown.alertWithType('error', 'Error', "Password must be at least 6 characters");
    }
    if (confirmPassword != password) {
      DropDownHolder.dropDown.alertWithType('error', 'Error', "Both passwords should match");
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
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <Header
          left={
            <Ionicons
              name="chevron-back"
              size={hp('3%')}
              color="rgba(255, 255, 255, 1)"
              onPress={() => {
                navigation.navigate(NAVIGATION.forgotpassword);
              }}
              disabled={isLoading}
            />
          }
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {strings.createnewpassword.title}
          </Text>

          <Text style={styles.subtitleText}>
            {strings.createnewpassword.subtitle}
          </Text>
        </View>

        <InputBox
          placeholder={strings.createnewpassword.passwordPlaceholder}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Divider />

        <InputBox
          placeholder={strings.createnewpassword.confirmpasswordPlaceholder}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />

        <Divider
          mainViewStyle={{
            marginVertical: hp('3%'),
          }}
        />

        <Button text={strings.createnewpassword.resetpassword} 
        onPress={()=>handleSubmit()}
        disabled={isLoading}
        Loading={isLoading}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
