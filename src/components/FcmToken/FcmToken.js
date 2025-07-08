import messaging from '@react-native-firebase/messaging';

export const checkToken = async (data) => {
    const fcmToken = await messaging().getToken();
   try {
    if (fcmToken) {
        return ({...data, device_token:fcmToken})
   } 
   } catch (error) {
    console.log({error})
   }
   }