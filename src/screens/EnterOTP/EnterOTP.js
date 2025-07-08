import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {Images} from '../../assets/assets.path';
import {strings} from '../../Localization/Localization';

import {DropDownHolder} from '../../utils/DropDownHolder';
import {styles} from './EnterOTP.Styles';
import {Divider,Button,Header} from '../../components';
import {TYPES, verifyotp} from '../../redux/actions/User.Actions';
import {isLoadingSelector} from '../../redux/selectors/Status.Selectors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NAVIGATION} from '../../constants/Navigation.Constants';
import {
  emailValidation,
  otpValidation,
} from '../../utils/Validations/Auth.Validations';
import {getUser} from '../../redux/selectors/User.Selectors';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export const VerifyOTP = ({navigation, route}) => {
  const user = useSelector(getUser);

  const {emailId} = route?.params || '';

  const dispatch = useDispatch();
  const [validate, setValidate] = useState({
    emailError: null,
    otpError: null,
  });
  const [value, setValue] = useState('');

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.VERIFYOTP], state),
  );

  const handleEmailValidation = value => {
    const emailError = emailValidation(value);
    if (!emailError) {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter a valid email address',
      );
      setValidate({
        emailError: 'Please enter a valid email address',
        otpError: validate.otpError,
      });
      return false;
    } else {
      setValidate({
        emailError: true,
        otpError: validate.otpError,
      });
      return true;
    }
  };

  const handleOtpValidation = value => {
    const otpError = otpValidation(value);
    if (!otpError) {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter a valid otp',
      );
      setValidate({
        emailError: validate.emailError,
        otpError: 'Please enter a valid otp',
      });
      return false;
    } else {
      setValidate({
        emailError: validate.emailError,
        otpError: true,
      });
      return true;
    }
  };

  const handleSubmit = async () => {
    const otpValidation = handleOtpValidation(value);
    const emailValidation = handleEmailValidation(emailId);
    Keyboard.dismiss(); // When you click on button firstly keyboard is dismiss when perform action.

    let params = {
      email: emailId,
      otp: value,
    };
    if (emailId.length && emailValidation && otpValidation) {
      dispatch(
        verifyotp(params, cancelToken.token, () => {
          navigation.navigate(NAVIGATION.createnewpassword, {emailId: emailId});
        }),
      );
    } else {
      if (validate.emailError == 'Please enter a valid email address') {
        DropDownHolder.dropDown.alertWithType(
          'error',
          'Error',
          validate.emailError,
        );
      }
      if (!emailId.length) {
        DropDownHolder.dropDown.alertWithType(
          'error',
          'Error',
          strings.login.emailRequired,
        );
      }
    }
  };

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
            {strings.enterOTP.verificationCode}
          </Text>

          <Text style={styles.subtitleText}>
            {strings.enterOTP.otpSentOnEmail}
          </Text>
        </View>

        <Divider />

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
              backgroundColor:'#3B0077',
              height:60, 
              width:60
            }}
            cellSpacing={30}
            cellSize={40}
            cellStyleFocused={{
              borderColor: '#222',
            }}
            textStyle={{
              fontSize: 24,
              color: '#fff',
            }}
            keyboardType="phone-pad"
            allowFontScaling={false}
            containerStyle={{
              alignSelf:'center',
            }}
          />
        <Divider
          mainViewStyle={{
            marginVertical: hp('4%'),
          }}
        />

        <Button
          text={strings.enterOTP.verifyOtp} 
          onPress={() => {
            handleSubmit();
          }}
          disabled={isLoading}
          Loading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
