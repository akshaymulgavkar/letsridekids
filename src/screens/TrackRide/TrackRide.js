import React, { useState, useRef, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Images } from '../../assets/assets.path';
import { styles } from './TrackRide.Styles'
import { GetLiveLocation,Header } from '../../components';
import socketIO from 'socket.io-client';
import { ApiEndPoints } from '../../redux/controllers/ApiEndPoints';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/User.Selectors';
import { getPreciseDistance } from 'geolib';
import { locationChecker } from '../../utils/locationChecker';

export const TrackRide = ({ navigation, route }) => {

  const user = useSelector(getUser)
  const mapRef = useRef()
  const markerRef = useRef()
  const [socketData, setSocketData] = useState({})

  const socket = socketIO(ApiEndPoints.BASE_URL);

  const { key } = route.params

  useEffect(() => {
    console.log('here 2');
    locationChecker();
    getCurrentLocation()
  }, [])

  const { data } = route.params.coordinates || ''

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id, "connect " + Platform.OS); // "G5p5..."
    });
    socket.on("disconnect", () => {
      console.log("disconnect "+ Platform.OS);
    });
    socket.on('emitCurrentLocation', (data) => {
      console.log("socketdata "+ Platform.OS, data)
      setSocketData(data)
    })
    if (key=='Publish'){
    const interval = setInterval(() => {
      console.log('here 1', Platform.OS);
      getCurrentLocation()
    }, 4000);
    return () => clearInterval(interval)}
  }, [])



  useEffect(() => {
    if (key != 'Publish') {
      setHeading(socketData?.heading)
      animate(socketData?.currentLat, socketData?.currentLong);
      setCurrentLocation({
        latitude: socketData?.currentLat,
        longitude: socketData?.currentLong,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421
      });
      setCoordinate(new AnimatedRegion({
        latitude: socketData?.currentLat,
        longitude: socketData?.currentLong,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421
      }))
    }
  }, [socketData])


  const [prevLocation, setPrevLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  })

  const [coordinate, setCoordinate] = useState(new AnimatedRegion({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  }))

  const [heading, setHeading] = useState(0)

  const getCurrentLocation = async () => {
    const { latitude, longitude, heading } = await GetLiveLocation()
    setHeading(heading)
    animate(latitude, longitude);
    setCurrentLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });

    setCoordinate(new AnimatedRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    }))
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }

  const onCenter = () => {
    mapRef.current.animateToRegion(currentLocation)
  }


  const [coordinates] = useState([
    {
      latitude: data.fromlocation.coordinates[1],
      longitude: data.fromlocation.coordinates[0],
    },
    {
      latitude: data.tolocation.coordinates[1],
      longitude: data.tolocation.coordinates[0],
    },
  ]);

  const checkEmit = async (e) => {
    if (key === 'Publish') {
      const { longitude, latitude } = e?.nativeEvent?.coordinate

      var dis = getPreciseDistance(
        { latitude: prevLocation.latitude, longitude: prevLocation.longitude },
        { latitude: latitude, longitude: longitude },
      )
      if (dis >= 100) {
        setPrevLocation({ latitude: latitude, longitude: longitude })
        socket.emit('updateCurrentLocation', { currentLat: latitude, currentLong: longitude, heading: heading, rideId: data?._id, userId: user?._id })
        console.log('emitted')
      }
    }

  }
console.log({currentLocation},'coordinates[1]',coordinates[0])
  return (
    <View style={styles.container}>
      {Platform.OS == 'android' && 
        <TouchableOpacity style={{marginTop:50,marginStart:10,marginVertical:5}}
          onPress={() => navigation.goBack()}>
            <Image
              source={Images.leftArrow}
              style={{ tintColor: '#fff',backgroundColor:'#00000080'}}
              resizeMode="cover"
            />
            </TouchableOpacity>
          }
       <MapView
        ref={mapRef}
        style={styles.maps}
        provider='google'
        loadingEnabled
        showsUserLocation
        onUserLocationChange={(data) => checkEmit(data)}
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
          origin={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}
          destination={coordinates[1]}
          mode="DRIVING"
          apikey={'AIzaSyBd6cxRaM91fdbrWxOyVotopPGZO2PyxOI'} // insert your API Key here
          strokeWidth={4}
          precision="high"
          strokeColor="#000000"
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
        {key != 'Publish' &&<Marker.Animated coordinate={coordinate} ref={markerRef}>
          <Image source={Images.CurrentLocation} style={{
            width: 40,
            height: 40,
            transform: [{ rotate: `${heading??1}deg` }]
          }}
            resizeMode="contain"
          />
        </Marker.Animated>}
        <Marker coordinate={coordinates[1]} image={Images.Ellipse} style={{ height: 35, width: 35 }} />
        {data?.stops?.map((item) => (<Marker coordinate={{ latitude: item?.coordinates[1], longitude: item?.coordinates[0] }} />))}
      </MapView>


    </View>
  );
}
