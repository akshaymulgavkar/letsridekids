import React, {useEffect, useState} from 'react';
import {View,Image,StatusBar,Text} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {Button} from '../../components';
import {CHATS, TABS} from '../../constants/Navigation.Constants';
import {styles} from './BookRideSuccess.Styles'
import { useDispatch } from 'react-redux';
import { clearSearchRide } from '../../redux/actions/SearchRides.Action';
import firestore from '@react-native-firebase/firestore'

export const BookRideSuccess = ({navigation, route}) => {

    const dispatch = useDispatch()

    const {roomId} = route.params || []

    const [roomData, setRoomData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    getRoomDetails()
    }, [])
    
    const getRoomDetails= async() =>{
      setLoading(true)
      const data = await firestore().collection('rooms').doc(roomId).get()
      setRoomData(data?._data)
      setLoading(false)
      return data?._data
    }

    const handleDone=async()=>{
        dispatch(clearSearchRide())  
        const data = await getRoomDetails()
        navigation.navigate(CHATS.chatDetails, {roomDetails:data, key:'booking'})
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
            source={Images.RideBookSuccess}
            style={styles.Image}
            resizeMode="contain"
          />

          <View
            style={styles.publishRideView}>
            <Text
              style={styles.publishRideText}>
              {strings.bookRideDone.ridePublished}
            </Text>

            <Text
              style={styles.publishSuccessText}>
              {strings.bookRideDone.publishSuccess}
            </Text>
          </View>

          <Button
            onPress={() => handleDone()}
            text={strings.passwordChangeDone.done}
            textStyle={styles.buttonText}
            disabled={loading}
            Loading={loading}
          />
        </View>
      </SafeAreaView>
    </>
  )
}