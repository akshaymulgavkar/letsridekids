'use strick';

import React, {
  useEffect,
  useState
} from 'react';

import { LogBox, Alert, Linking, BackHandler, Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigation from './src/routes/Root.Navigation';
import Splash from './src/screens/Splash/Splash';
import { persistor, store } from './src/redux/store/Index.Store';
import { DropDownHolder } from './src/utils/DropDownHolder';
import { Fonts } from './src/theme/Fonts';
import VersionCheck from 'react-native-version-check';
import remoteConfig from '@react-native-firebase/remote-config';
import { changeBaseURL } from './src/redux/controllers/ApiEndPoints';
import axios from 'axios';

LogBox.ignoreAllLogs();

const App = () => {

  const [gateLifted, setGateLifted] = useState(false);
  // constc

  function onBeforeLift() {
    setTimeout(() => {
      setGateLifted(true)
    }, 2000)
  }

  useEffect(()=>{
    fetchRemoteData()
  },[])

  const fetchRemoteData = async () => {
    try {
      await remoteConfig().fetch(10); // 10 seconds cache
      const activated = await remoteConfig().fetchAndActivate(); //can read remote data if true
      if (activated) {
        const values = await remoteConfig().getAll();//returns all values set in remote
        console.log(values?.ipAddress?._value);
        // axios.defaults.baseURL=values?.ipAddress?._value/
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    checkAppUpdate()
  }, [])

  const checkAppUpdate= async ()=>{
    try {
        let updateNeeded = await VersionCheck.needUpdate();
        console.log({updateNeeded})
        if (updateNeeded && updateNeeded.isNeeded){
         
          Alert.alert('Please Update',
          'You will have to update your app to the latest version to continue using.',[
            {
              text:'Update',
              onPress:()=>{
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              }
            }
          ],
          {cancelable:false}
          )
        }
    } catch (error) {
      console.log({error})
    }
  }
  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
        {gateLifted ? <RootNavigation /> : <Splash />}
        <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)}
          updateStatusBar={true}
          titleStyle={{ fontFamily: Fonts.Lato900, color: '#FFF', fontSize: 18 }}
          messageStyle={{ fontFamily: Fonts.Lato400, color: '#FFF', fontSize: 16 }}
          closeInterval={2000}
          errorColor='red'
          infoColor='rgba(143, 252, 255, 1)'
          successColor='rgba(143, 252, 255, 1)'
          inactiveStatusBarStyle='dark-content'
          inactiveStatusBarBackgroundColor='#ffffff'
        />
      </PersistGate>
    </Provider>
  );
};
export default App;