import {Text,View,SafeAreaView,StatusBar,TouchableOpacity,Keyboard} from 'react-native';
import React, {useState, useEffect, useReducer, useRef} from 'react';
import {styles,GooglePlacesAutocompleteStyles,mapstyles} from './PickLocation.Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {PUBLISH_RIDES, TABS} from '../../constants/Navigation.Constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {strings} from '../../Localization/Localization';
import MapView, {Marker, Callout} from 'react-native-maps';
import {Button} from '../../components';
import {saveFromLatLong,saveToLatLong} from '../../redux/actions/SearchRides.Action';
import {useDispatch, useSelector} from 'react-redux';
import { saveFromLatLongPublish, saveStopOvers, saveToLatLongPublish } from '../../redux/actions/PublishRides.Action';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { getPostRidesData } from '../../redux/selectors/PostRides.Selectors';
import Geolocation from 'react-native-geolocation-service';
import { locationChecker } from '../../utils/locationChecker';
import { ActivityIndicator } from 'react-native-paper';

export const PickLocation = ({navigation, route}) => {

  const getPublishData = useSelector(getPostRidesData)

  const [stops, setStops] = useState(getPublishData?.stops ? getPublishData?.stops :[]) 
  const [mapReady, setMapReady] = useState(false)
  const autoFillAddressRef = useRef(null)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    locationChecker();
  }, [])

  const dispatch = useDispatch();

  const [renderMarker, setRenderMarker] = useState(false);
  const [address, setAddress] = useState('')

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [positionMarker, setPositionMarker] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      getAddress(crd);
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  };

  const getAddress = data => {
    const myApiKey = 'AIzaSyBMsoUU3tLRJMqQ-JU98dum5pFR0kUZ2ek';

    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          data.latitude +
          ',' +
          data.longitude +
          '&key=' +
          myApiKey,
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            setAddress(responseJson?.results?.[0]?.formatted_address)
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const handleOnPressMap = data => {
    getAddress(data);
    setRenderMarker(true);
    setPositionMarker({
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });
  };
  const {key} = route.params;

  const handleNext = () => {
    if (renderMarker){  

    if (address.length>0 && key === 'pickUp') {
      dispatch(saveFromLatLong({positionMarker,address}));
      navigation.navigate(TABS.home);
    } else if (address.length>0 && key === 'destination') {
      dispatch(saveToLatLong({positionMarker,address}));
      navigation.navigate(TABS.home);
    } else if (address.length>0 && key === 'fromPublishRide'){
      dispatch(saveFromLatLongPublish({positionMarker, address}))
      navigation.navigate(TABS.publishRides)
    }
    else if (address.length>0 && key === 'toPublishRide'){
      dispatch(saveToLatLongPublish({positionMarker, address}))
      navigation.navigate(TABS.publishRides)
    }
    else if (address.length>0 && key === 'stopOvers'){
      let obj = {
        address:address,
        coordinates:[positionMarker.longitude, positionMarker.latitude] 
      }
      let arr = stops
      arr.push(obj)
      dispatch(saveStopOvers(arr))
      navigation.navigate(PUBLISH_RIDES.addStopOvers)
    }
    else {
      DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please select a location')
    }
    }
    else {
      DropDownHolder.dropDown.alertWithType('error', 'Error', 'Please select a location')
    }
  };

  return (
    <SafeAreaView style={{}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View style={{flexDirection:'row'}}>
     
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
        ref={autoFillAddressRef}
          renderLeftButton={()=>{
            return (
            <Entypo
              name="chevron-left"
              size={30}
              color='#000'
              onPress={() => navigation.goBack()}
              style={styles.leftIcon}
            />)
          }}
          renderRightButton={()=>{
            return (
            <Entypo
              name="cross"
              size={30}
              color='#000'
              onPress={() => autoFillAddressRef.current.clear()|| setAddress('')}
              style={styles.leftIcon}
            />)
          }}
          placeholder={renderMarker && address.length>0 ? address : strings.pickLocation.searchAddress}
          query={{key: 'AIzaSyBMsoUU3tLRJMqQ-JU98dum5pFR0kUZ2ek'}}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setPosition({
              ...positionMarker,
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            });
            setPositionMarker({
              ...positionMarker,
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            });
            let dataAddress = {
              latitude:details?.geometry?.location.lat,
              longitude:details?.geometry?.location.lng
            }
            getAddress(dataAddress)
            setRenderMarker(true);
          }}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          listViewDisplayed={true}
          minLength={3}
          renderDescription={row => row.description}
          nearbyPlacesAPI="GooglePlacesSearch"
          styles={GooglePlacesAutocompleteStyles}
          textInputProps={{placeholderTextColor: '#00000055'}}
        />
      </View>
      </View>

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => {
          getCurrentLocation();
          setPosition(position);
          setPositionMarker(position);
          setRenderMarker(true);
          Keyboard.dismiss()
        }}>
        <View style={{width: '10%'}}>
          <Entypo
            name="hair-cross"
            style={{alignSelf: 'center'}}
            size={20}
            color="#26185F"
          />
        </View>
        <View style={{width: '90%', flexDirection: 'row'}}>
          <Text style={styles.currentLocationText}>
            {strings.pickLocation.currentLocation}
          </Text>
        </View>
      </TouchableOpacity>

      {!isKeyboardVisible  &&<View style={{width: '100%', height: '80%'}}>
        <MapView
          style={{height: '100%', width: '100%'}}
          region={position}
          // showsUserLocation={true}
          // customMapStyle={mapstyles}
          // showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          provider='google'
          scrollEnabled={true}
          onMapReady={()=>setMapReady(true)}
          zoomEnabled={true}
          pitchEnabled={true}
          onPress={e => {
            handleOnPressMap(e.nativeEvent.coordinate)
          }}
          rotateEnabled={false}>
          {renderMarker && (
            <Marker
              coordinate={positionMarker}
            />
          )}
        </MapView>

        <Button
          text="Next"
          onPress={() => {
            handleNext();
          }}
          mainViewStyle={{bottom: '30%', width:"50%", alignSelf:'center'}}
          Loading={!mapReady}
        />
      </View>}
    </SafeAreaView>
  );
};
