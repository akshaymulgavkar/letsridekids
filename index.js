/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';

notifee.registerForegroundService((notification) => {
console.log({notification})
    return new Promise(() => {
        // Long running task...
    });
});
notifee.createChannel({
    id: "LRK",
    name: "LRK",
});

AppRegistry.registerComponent(appName, () => App);
