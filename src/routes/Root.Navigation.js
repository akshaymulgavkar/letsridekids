import React, { useRef } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import {AppNavigation} from './App.Navigation';
import AuthNavigation from './Auth.Navigation';
import { navigationRef } from './Ref.Navigation';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/selectors/User.Selectors';

const RootNavigation = () => {

    const routeNameRef = useRef();
    const user = useSelector(getUser)

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });

                    console.log(currentRouteName);
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            {console.log("user from navigation container is", user)}
            {user ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    )
}

export default RootNavigation;