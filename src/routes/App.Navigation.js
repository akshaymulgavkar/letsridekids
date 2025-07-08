import React, { useEffect, useState } from 'react';
import { Home, Chats, Profile, PublishRides, Rides, PickLocation, PickDates, RideListing, PickDatesPublishRides, PickTimePublishRides, AddStopOvers, PickSeatsPublishRides, ViewRoute, PublishRideDone, RideDetails,MyRidesDetails, TrackRide, AccountSettings, ChangePassword , EditProfile, AddEmail, AddMobileNumber,VerifyOtp, HelpAndSupport, AddVehicleDetails, RideCompleted, BookRideSuccess,ChatDetails }  from '../screens';
import { TABS, HOME, PUBLISH_RIDES, RIDES, PROFILE, CHATS } from '../constants/Navigation.Constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Platform, Keyboard, StyleSheet } from 'react-native';
import { View, Dimensions } from 'react-native';
import { Fonts } from '../theme/Fonts';
import { strings } from '../Localization/Localization';
const { height } = Dimensions.get('screen');
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { handleNotifications,TabBarIcon } from '../components';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const getlabel = label => {
  switch (label) {
    case 'Home':
      return strings.bottomTab.home;

    case 'Chats':
      return strings.bottomTab.chats;

    case 'PublishRides':
      return strings.bottomTab.publishRides;

    case 'Rides':
      return strings.bottomTab.rides;

    case 'Profile':
      return strings.bottomTab.profile;

    default:
      return label;
  }
};

function TabBarOption({ state, navigation }) {

  handleNotifications(navigation)

  const [keyboardStatus, setKeyboardStatus] = useState(true);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={{ backgroundColor: '#fff' }}>
      {Platform.OS === 'ios' && (
        <View style={styles.tabBarIos}>
          {state.routes.map((route, index) => {
            const label = route.name;
            const isFocused = state.index === index;
            const onPress = () => { const event = navigation.emit({ type: 'tabPress', target: route.key})
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity key={route.key}accessibilityState={isFocused ? { selected: true } : {}}onPress={onPress}style={styles.tabBarIconIos}>
                <TabBarIcon routeName={label} focused={isFocused} style={{margin: 5}}/>
                <Text style={{ fontWeight: '500', color: isFocused ? '#26185F' : '#00000055', fontSize: 12, fontFamily: Fonts.Lato400}}
                  allowFontScaling={false}>
                  {getlabel(label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {Platform.OS === 'android' && keyboardStatus ? (
        <View
          style={styles.tabBarAndroid}>
          {state.routes.map((route, index) => {
            const label = route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={styles.tabBarIconAndroid}>
                <TabBarIcon
                  focused={isFocused}
                  routeName={label}
                  style={{}}
                />

                <Text
                  style={{
                    fontWeight: '500',
                    color: isFocused ? '#26185F' : '#00000055',
                    fontSize: 12,
                    fontFamily: Fonts.Lato400,
                    paddingBottom: 3,
                  }}
                  allowFontScaling={false}>
                  {getlabel(label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

export const DashBoardNavigation = props => {
  const HomeScreenPropped = () => <Home {...props} />;
  const ChatScreenPropped = () => <Chats {...props} />;
  const RideScreenPropped = () => <Rides {...props} />;
  const PublishRidePropped = () => <PublishRides {...props} />;
  const ProfileScreenPropped = () => <Profile {...props} />;

  return (
    <>
      <Tabs.Navigator
        backBehavior="initialRoute"
        initialRouteName={TABS.home}
        tabBar={props => <TabBarOption {...props} />}
        screenOptions={() => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { position: 'relative' },
          unmountOnBlur: true
        })}>
        <Tabs.Screen name={TABS.home} component={HomeScreenPropped} />

        <Tabs.Screen name={TABS.chats} component={ChatScreenPropped} />

        <Tabs.Screen name={TABS.publishRides} component={PublishRidePropped} />

        <Tabs.Screen name={TABS.rides} component={RideScreenPropped} />

        <Tabs.Screen name={TABS.profile} component={ProfileScreenPropped} />
      </Tabs.Navigator>
    </>
  );
};

export const AppNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name={'DashBoardNavigation'} component={DashBoardNavigation}/>
      <Stack.Screen name={HOME.pickLocation} component={PickLocation} />
      <Stack.Screen name={HOME.pickDate} component={PickDates} />
      <Stack.Screen name={HOME.searchRides} component={RideListing} />
      <Stack.Screen name={PUBLISH_RIDES.addStopOvers} component={AddStopOvers} />
      <Stack.Screen name={PUBLISH_RIDES.pickDatesPublishRides} component={PickDatesPublishRides} />
      <Stack.Screen name={PUBLISH_RIDES.pickTimePublishRides} component={PickTimePublishRides} />
      <Stack.Screen name={PUBLISH_RIDES.pickSeatsPublishRides} component={PickSeatsPublishRides} />
      <Stack.Screen name={PUBLISH_RIDES.publishRideDone} component={PublishRideDone} />
      <Stack.Screen name={HOME.rideDetails} component={RideDetails} />
      <Stack.Screen name={HOME.viewRoute} component={ViewRoute} />
      <Stack.Screen name={RIDES.myRideDetails} component={MyRidesDetails} />
      <Stack.Screen name={RIDES.trackRide} component={TrackRide} />
      <Stack.Screen name={PROFILE.editProfile} component={EditProfile} />
      <Stack.Screen name={PROFILE.changePassword} component={ChangePassword} />
      <Stack.Screen name={PROFILE.accountSettings} component={AccountSettings} />
      <Stack.Screen name={PROFILE.addEmail} component={AddEmail} />
      <Stack.Screen name={PROFILE.addPhoneNumber} component={AddMobileNumber} />
      <Stack.Screen name={PROFILE.verifyOtp} component={VerifyOtp} />
      <Stack.Screen name={PROFILE.helpAndSupport} component={HelpAndSupport} />
      <Stack.Screen name={PROFILE.addVehicleDetails} component={AddVehicleDetails} />
      <Stack.Screen name={RIDES.rideCompleted} component={RideCompleted} />
      <Stack.Screen name={HOME.bookingDone} component={BookRideSuccess} />
      <Stack.Screen options={{headerShown: true}} name={CHATS.chatDetails} component={ChatDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIos:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 0.5,
    borderTopColor: '#53535355',
    bottom: 20,
    backgroundColor: '#fff',
  },
  tabBarIconIos:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height * 0.07,
    elevation: 5,
    paddingTop: 7,
  },
  tabBarAndroid:{
    flexDirection: 'row',
    height: height * 0.07,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    elevation: 5,
    paddingTop: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabBarIconAndroid:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})