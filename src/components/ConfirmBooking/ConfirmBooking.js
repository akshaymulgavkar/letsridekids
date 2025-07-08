import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images } from '../../assets/assets.path'
import { styles } from './ConfirmBooking.styles'
import { useDispatch, useSelector } from 'react-redux'
import { postRidePermission, TYPES } from '../../redux/actions/Rides.Actions'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation'
import { getPreciseDistance } from 'geolib'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors'
import { getUser } from '../../redux/selectors/User.Selectors'

export const ConfirmBooking = ({roomDetails, setRequested, name}) => {

  const isLoading = useSelector(state =>isLoadingSelector([TYPES.BOOKING_PERMISSION], state));
  const user = useSelector(getUser)

  const dispatch = useDispatch();

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source())

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const calculateDistance = coordinates => {
    var dis = getPreciseDistance(
      {latitude: position?.latitude, longitude: position?.longitude},
      {latitude: coordinates[1], longitude: coordinates[0]},
    );
    return <Text>{parseFloat(dis / 1609.344).toFixed(2)} Miles</Text>;
  };

  const handleRideBookStatus=( status )=>{

    let params ={
      approval:status== true? 1: 0,
      rideId:roomDetails?.rideDetail?.rideId
    }
    try {
      dispatch(postRidePermission(params, cancelToken.token,()=>{
        firestore().collection('rooms').doc(roomDetails?.roomId).update({ 'rideDetail.requestStatus': false}).then(console.log('successfully message sent'))
        setRequested(false)}))
    } catch (error) {
      console.log('error', error)
    }
  }



  useEffect(() => {
    const msgResponse = firestore().collection('rooms').doc(roomDetails?.roomId).onSnapshot(documentSnapshot => {
      try {  
        const requestStatus = documentSnapshot?._data?.rideDetail?.requestStatus
        if (roomDetails?.rideDetail?.publisherId!=user?._id && requestStatus== false){
            setRequested(false)
        }
      } catch (err) {
        console.log('error is', err)
      }
    })
    return () => { msgResponse() }
  }, []);

  return (
   <>{roomDetails?.rideDetail?.publisherId==user?._id?
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            <Text style={styles.nameText}> {name} </Text> wants to book a ride</Text>
          <Text style={styles.timeText}>{moment(roomDetails?.last_message?.createdAt?.toDate()).format('hh:mm a')}</Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: '5%', marginTop: '4%', marginStart: '2%' }}>
              <Image source={Images.Ellipse} resizeMode="cover" />
              <Image source={Images.LineExtra} style={{ left: '21%' }} resizeMode="cover" />
              <Image source={Images.Ellipse} resizeMode="cover" />
            </View>
            <View style={{ width: '95%' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.locationContainer}>
                  <Text style={styles.fromToText}>From</Text>
                  <Text style={styles.fromText} numberOfLines={1}>{roomDetails?.rideDetail?.fromLocationAddress}</Text>
                  <Text style={styles.distanceText}>{calculateDistance(roomDetails?.rideDetail?.fromLocationCoordinate)} from your location</Text>
                </View>
              </View>

              <View style={styles.lowerContainer}>
                <View style={styles.locationContainer}>
                  <Text style={styles.fromToText}>To</Text>
                  <Text style={styles.fromText} numberOfLines={1}>{roomDetails?.rideDetail?.toLocationAddress}</Text>
                  <Text style={styles.distanceText}>{calculateDistance(roomDetails?.rideDetail?.toLocationCoordinate)} from your location</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.declineBtn} onPress={()=> handleRideBookStatus(false)} disabled={isLoading}>
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={()=> handleRideBookStatus(true)} disabled={isLoading}>
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </>
    :<>
      <View style={{ flex: 1 }}>
        <View style={[styles.messageContainer, {backgroundColor:'#5B3FCC15', marginStart:30}]}>
          <Text style={styles.messageText}>
            <Text style={styles.nameText}> {user?.fullname} </Text> wants to book a ride</Text>
          <Text style={styles.timeText}>{moment(roomDetails?.last_message?.createdAt?.toDate()).format('hh:mm a')}</Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: '5%', marginTop: '4%', marginStart: '2%' }}>
              <Image source={Images.Ellipse} resizeMode="cover" />
              <Image source={Images.LineExtra} style={{ left: '21%' }} resizeMode="cover" />
              <Image source={Images.Ellipse} resizeMode="cover" />
            </View>
            <View style={{ width: '95%' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.locationContainer}>
                  <Text style={styles.fromToText}>From</Text>
                  <Text style={styles.fromText} numberOfLines={1}>{roomDetails?.rideDetail?.fromLocationAddress}</Text>
                  <Text style={styles.distanceText}>{calculateDistance(roomDetails?.rideDetail?.fromLocationCoordinate)} from your location</Text>
                </View>
              </View>

              <View style={styles.lowerContainer}>
                <View style={styles.locationContainer}>
                  <Text style={styles.fromToText}>To</Text>
                  <Text style={styles.fromText} numberOfLines={1}>{roomDetails?.rideDetail?.toLocationAddress}</Text>
                  <Text style={styles.distanceText}>{calculateDistance(roomDetails?.rideDetail?.toLocationCoordinate)} from your location</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

          <View style={styles.WaitTextContainer}>
            <Text style={styles.WaitText}>Booking Request has been sent, Please wait for approval</Text>
          </View>
      </View>
      </>}
    </>

  )
}

