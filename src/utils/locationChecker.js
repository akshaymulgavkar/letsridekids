import { Alert, Linking } from 'react-native';
import { PERMISSIONS,check, RESULTS , request} from 'react-native-permissions';

export const locationChecker  = async() => {
        try {
          check(PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            AskLocationPermission()
            AskLocationPermissionAndriod()
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            AskLocationPermissionForced()
            break;
        }
      })
        } catch (error) {
          console.log('Error checking location permission:', error);
        }      
};

const AskLocationPermission=()=>{
    try {
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
            console.log({result})
        })
        
    } catch (error) {
        console.log('Error while asking location', error)
    }
}

const AskLocationPermissionAndriod=()=>{
  try {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        console.log({result})
    })
    
} catch (error) {
    console.log('Error while asking location', error)
}
}

const AskLocationPermissionForced=()=>{
    try {
        Alert.alert(
            'Alert',
            "LetsRideKids would need you to allow location always, please allow in settings",
            [
              { text: 'Change in settings', onPress: () => Linking.openSettings() }
            ],
            { cancelable: false }
          );
    } catch (error) {
        
    }
}

const AskLocationPermissionForcedAndroid=()=>{
  try {
      Alert.alert(
          'Alert',
          "LetsRideKids would need you to allow location always, please allow in settings",
          [
            { text: 'Change in settings', onPress: () => Linking.openSettings() }
          ],
          { cancelable: false }
        );
  } catch (error) {
      
  }
}