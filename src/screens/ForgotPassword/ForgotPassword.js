import React, {useState} from 'react';
import { StyleSheet, Image, StatusBar, Text, View, KeyboardAvoidingView, Keyboard} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {Images} from '../../assets/assets.path';
import {strings} from '../../Localization/Localization';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {emailValidation} from '../../utils/Validations/Auth.Validations';
import {styles} from './ForgotPassword.Styles';
import {InputBox,Divider,Button,Header} from '../../components';
import {forgotpassword,  TYPES} from '../../redux/actions/User.Actions';
import {isLoadingSelector} from '../../redux/selectors/Status.Selectors';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NAVIGATION} from '../../constants/Navigation.Constants';

export const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [validate, setValidate] = useState({
    emailError: null,
  });
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FORGOTPASSWORD], state),
  );

   const handleEmailValidation = value => {
    const emailError = emailValidation(value);
    if (!emailError) {
      setValidate({emailError: 'Please enter a valid email address'})
      return false
    } else {setValidate({emailError: true});
      return true
    }
  };

  const handleSubmit = async () => {
    const emailValidation = handleEmailValidation(email);

    Keyboard.dismiss(); // When you click on button firstly keyboard is dismiss when perform action.

    let params = {
      email,
    };
    if (email.length && emailValidation) {
      dispatch(forgotpassword(params,()=>{
        navigation.navigate(NAVIGATION.enterOTP, {emailId:email})
      }, cancelToken.token));

    } else {
      if (!emailValidation) {
        DropDownHolder.dropDown.alertWithType('error','Error','Please enter a valid email address')
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
                navigation.navigate(NAVIGATION.login);
              }}
              disabled={isLoading}
            />
          }
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{strings.forgotpassword.title}</Text>

          <Text style={styles.subtitleText}>
            {strings.forgotpassword.subtitle}
          </Text>
        </View>

        <Divider />

        <InputBox
          placeholder={strings.forgotpassword.emailPlaceholder}
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
          onChangeText={text => setEmail(text)}
          // onEndEditing={text =>
          //     handleEmailValidation(text.nativeEvent.text)
          // }
        />

        <Divider
          mainViewStyle={{
            marginVertical: hp('2%'),
          }}
        />

        <Button
          text={strings.forgotpassword.sendrestlink}
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
