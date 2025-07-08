import { SafeAreaView, StatusBar, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images } from '../../assets/assets.path'
import {styles} from './RideCompleted.Styles'
import {strings} from '../../Localization/Localization';
import { useDispatch } from 'react-redux';
import { rateDriverToPassengers } from '../../redux/actions/Rides.Actions';
import axios from 'axios';
import { TABS } from '../../constants/Navigation.Constants';

export const RideCompleted = ({route, navigation}) => {


    const {data} = route.params || []
    const [ratings,setRatings]=useState([])
    const [apiData, setApiData] = useState([])

    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());


    const dispatch = useDispatch()

    useEffect(() => {
      let temp = data.map((item, index)=>{return ({
        'bookingId':item?._id,
        'passengerID':item?.userDetail?._id,
        'passengerRating':1

    })})

    setApiData(temp)
    }, [])
    

    const onFinishRating=(e, id)=>{
      
      let temp = apiData

      for (var i =0;i<temp.length;i++){
        if (temp[i]?.bookingId === id){
          temp[i].passengerRating=e
        }
      }
        setApiData(temp)
    }


    const handleDone=()=>{
       try {
        let params = apiData
        dispatch(rateDriverToPassengers(params, cancelToken.token,()=>{navigation.navigate(TABS.rides)} ))
       } catch (error) {
        console.log('error is', error)
       }
    }
    return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaView
        style={styles.container}>
        <View
          style={styles.mainView}>
          <Image
            source={Images.ridePublished}
            style={styles.Image}
            resizeMode="contain"
          />

          <View
            style={styles.publishRideView}>
            <Text
              style={styles.publishRideText}>
              {strings.rateRide.rideCompleted}
            </Text>

            <Text
              style={styles.publishSuccessText}>
              {strings.rateRide.rateYourRide}
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </>
  )
}