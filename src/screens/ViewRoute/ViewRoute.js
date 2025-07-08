import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet,View,Dimensions,TouchableOpacity,Image, Platform} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {Header} from '../../components';

export const ViewRoute = ({navigation, route}) => {

    const mapRef = useRef()

    useEffect(() => {
      getPermission()
    }, [])
    
    const getPermission= async()=>{
      request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
    
    } 

    const {currentLocation, data} = route.params.coordinates || ''
    const {key} = route.params || ''

    const [coordinates] = useState([
    {
      latitude: key ==='rideDetails'? data?.ridePublishDetails?.fromlocation?.coordinates[1]:data.fromlocation.coordinates[1],
      longitude:key ==='rideDetails'? data?.ridePublishDetails?.fromlocation?.coordinates[0]:data.fromlocation.coordinates[0],
    },
    {
      latitude:key ==='rideDetails'? data?.ridePublishDetails?.tolocation?.coordinates[1]:data?.tolocation?.coordinates[1],
      longitude:key ==='rideDetails'?data?.ridePublishDetails?.tolocation?.coordinates[0] :data?.tolocation?.coordinates[0],
    },
  ]);


  return (
    <View style={styles.container}>
        <MapView
         ref={mapRef}
          style={styles.maps}
          provider='google'
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}>
           {Platform.OS == 'ios' && <Header
          left={
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.leftArrow}
                style={styles.Image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          }
        />}
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={'AIzaSyBd6cxRaM91fdbrWxOyVotopPGZO2PyxOI'} // insert your API Key here
            strokeWidth={4}
            strokeColor="#111111"
            optimizeWaypoints={true}
            onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                          right: 30,
                          bottom: 300,
                          left: 30,
                          top: 100,
                      },
                  });
          }}
          />
          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates[1]} />
          {key ==='rideDetails'? data?.ridePublishDetails?.stops?.map((item)=>(<Marker coordinate={{latitude: item?.coordinates[1],longitude: item?.coordinates[0]}}/>)) :data?.stops?.map((item)=>(<Marker coordinate={{latitude: item?.coordinates[1],longitude: item?.coordinates[0]}}/>))}
        </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  Image:{
    tintColor: '#fff', 
    backgroundColor:'#00000080', 
    margin:'10%', 
    marginTop:50, 
    height:30, 
    width:30
}
});
