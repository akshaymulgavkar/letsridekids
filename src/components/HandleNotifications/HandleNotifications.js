import messaging from '@react-native-firebase/messaging'
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { CHATS, RIDES, TABS } from '../../constants/Navigation.Constants';
import { Alert, Linking, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { ProfileController } from '../../redux/controllers/Profile.Controllers';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { HOME } from '../../constants/Navigation.Constants';

export const handleNotifications = (navigation) => {
  useEffect(() => {
    onDisplayNotification()

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage?.data);
      handleOnClickNotification(remoteMessage?.data, navigation)
    });

    const unsubscribe = messaging().onMessage(handlemessage);

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage)
      handleOnClickNotification(remoteMessage?.data, navigation)
    })

    messaging().getInitialNotification()
      .then(async (remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open', remoteMessage
        );
        if (remoteMessage) {
          console.log('remoteMessage?.data', remoteMessage?.data)
          const notification = remoteMessage.data;
          handleOnClickNotification(notification, navigation);
        }
      });

    return unsubscribe;
  }, [])

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail?.notification);
          handleOnClickNotification(detail?.notification?.data,navigation)
          break;
      }
    });
  }, []);

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    console.log(link, 'link');
    if (link.url) {
      // ...navigate to your offers screen
      openURL(link)
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink]);

  const handleDeepLink = async (url) => {
    openURL(url);
 }
  const openURL = async (e) => {
    try {
      const url = decodeURIComponent(e?.url)
      let id_type=url?.split("?")[2]?.split("&")
      if (id_type){
        let id =id_type[0].split("=")[1]
        let type=id_type[1].split("=")[1]
        let userid= id_type[2].split("=")[1]

        let data = {type}
        if (type == 2)data['rideId'] = id
        if (type == 3)data['roomId'] = id
        if (type == 4){
          data['rideId'] = id
          data['userID'] = userid
            }

        handleOnClickNotification({payload:JSON.stringify(data)}, navigation)
      }
      else{
        if (e?.utmParameters){
          handleOnClickNotification({payload:JSON.stringify({rideId:JSON.parse(e?.utmParameters?.utm_medium)?.rideId, type:e?.utmParameters?.utm_campaign, date:JSON.parse(e?.utmParameters?.utm_medium)?.date})}, navigation)
          return 
        }
        dynamicLinks().resolveLink(e?.url).then(e => {
          handleOnClickNotification({payload:JSON.stringify({rideId:JSON.parse(e?.utmParameters?.utm_medium)?.rideId, type:e?.utmParameters?.utm_campaign, date:JSON.parse(e?.utmParameters?.utm_medium)?.date})}, navigation)
        }).catch(e => {
          console.log("error errorrrrr", e);
        })
      }
    } catch (error) {
      console.log(error, 'open error');
    }
  }

  const handlemessage = async remoteMessage => {
    notifee.displayNotification({
      ...remoteMessage?.notification,
      ...remoteMessage,
      android: {
        ...remoteMessage?.notification?.android,
        channelId: 'LRK',
        asForegroundService: false,
      },
    });
  }

  async function onDisplayNotification() {
    await notifee.requestPermission({
      sound: true,
      announcement: true,
      inAppNotificationSettings: true,
      // ... other permission settings
    });

  }
}

export const handleOnClickNotification = async (data, navigation) => {
  const Typedata = JSON.parse(data?.payload)
  const { type } = Typedata
  if (type == 2) {
    let params = {
      rideId: Typedata?.rideId
    }
    try {
      const data = await ProfileController.getSinglePostedRide(params);
      navigation.navigate(RIDES.myRideDetails, { key: 'myPublished', data: data?.data[0] })
    } catch (error) {
      navigation.navigate(TABS.rides)

    }
  }
  else if (type == 3) {
    const data = await firestore().collection('rooms').doc(Typedata?.roomId).get()
    navigation.navigate(CHATS.chatDetails, { roomDetails: data?.data() })
  }
  else if (type == 4){
    let params = {
      rideId: Typedata?.rideId,
      userId: Typedata?.userID,
    }
    try {
      const data = await ProfileController.getSingleBookedRide(params);
      navigation.navigate(RIDES.myRideDetails, { key: 'myBookings', data: data?.detail[0]??[] })
    } catch (error) {
      navigation.navigate(TABS.rides)
    }
  }
  else if (type == 5){
    let params = {
      id: Typedata?.rideId,
      date:Typedata?.date
    }
    console.log({params})
    try {
      const data = await ProfileController.rideShareApi(params);
      console.log({data})
        navigation.navigate(HOME.rideDetails, {data: data?.data[0]??data?.data?.availableRides[0]??[]})
    } catch (error) {
      Alert.alert(
        'Alert',
        error?.message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
      navigation.navigate(TABS.home)
    }
  }
  else { navigation.navigate(TABS.home) }
}
