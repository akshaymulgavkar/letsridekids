import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATION } from '../constants/Navigation.Constants';
import { Login, SignUp, ForgotPassword, CreateNewPassword, VerifyEmail, VerifyOTP,ChangePasswordDone, VerifyUser} from '../screens';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={NAVIGATION.login} component={Login} options={{ gestureEnabled: false}}/>
      <Stack.Screen  name={NAVIGATION.signup}  component={SignUp} />
      <Stack.Screen name={NAVIGATION.forgotpassword} component={ForgotPassword}/>
      <Stack.Screen name={NAVIGATION.createnewpassword} component={CreateNewPassword}/>
      <Stack.Screen name={NAVIGATION.verifyemail} component={VerifyEmail} />
      <Stack.Screen  name={NAVIGATION.enterOTP}  component={VerifyOTP}  />
      <Stack.Screen  name={NAVIGATION.changePasswordDone}  component={ChangePasswordDone}  />
      <Stack.Screen  name={NAVIGATION.verifyUser}  component={VerifyUser}  />
          
    </Stack.Navigator>
  );
}
