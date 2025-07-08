import React, {useState} from 'react';
import {View,Image,StatusBar,Text,TouchableOpacity} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {PUBLISH_RIDES} from '../../constants/Navigation.Constants';
import {styles} from './PickSeatsPublishRides.Styles';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {editRide, publishRide, TYPES} from '../../redux/actions/PublishRides.Action';
import {getPostRidesData} from '../../redux/selectors/PostRides.Selectors';
import {DropDownHolder} from '../../utils/DropDownHolder';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { getUser } from '../../redux/selectors/User.Selectors';
import { VerificationModal,Divider ,Header,Button} from '../../components';
import { Overlay } from '@rneui/themed';

export const PickSeatsPublishRides = ({navigation}) => {

  const publishRideData = useSelector(getPostRidesData);
  const user= useSelector(getUser)
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.PUBLISH_RIDE], state));
  const isLoadingEdit = useSelector((state) => isLoadingSelector([TYPES.EDIT_RIDE], state));

  const [checked, setChecked] = useState(publishRideData?.type ? publishRideData?.type :'yes');
  const [seats, setSeats] = useState(publishRideData?.seats ? publishRideData?.seats :  1);
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [verificationModal, setVerificationModal] = useState(false)

  const dispatch = useDispatch();

  const checkUserVerified=()=>{
    if (user?.govtId?.isVerified ===false){
      console.log('user is unverified')
      return false
    }
    return true
  }

  const handleNext = () => {
    const checkUser= checkUserVerified()
    if (checkUser){
      let params = {
        tolatitude: publishRideData?.dropLatLong?.positionMarker?.latitude,
        tolongitude: publishRideData?.dropLatLong?.positionMarker?.longitude,
        fromlongitude: publishRideData?.pickLatLong?.positionMarker?.longitude,
        rideType: publishRideData.rideType === 'selectiveDays' ? 1 : 2,
        fromlatitude: publishRideData?.pickLatLong?.positionMarker?.latitude,
        seatCount: seats,
        instantBook: checked === 'yes' ? true : false,
        fromAddress:publishRideData?.pickLatLong?.address,
        toAddress: publishRideData?.dropLatLong?.address,
        stops:publishRideData?.stops ? publishRideData?.stops :[]
      }
      if (publishRideData?.dropLatLong?.positionMarker?.latitude &&publishRideData?.dropLatLong?.positionMarker?.longitude &&publishRideData?.pickLatLong?.positionMarker?.longitude &&publishRideData.rideType &&publishRideData?.pickLatLong?.positionMarker?.latitude &&publishRideData?.date &&publishRideData?.time &&seats) {
        handleApiCall(params)
      } else {
        if (publishRideData?.dropLatLong?.positionMarker?.latitude === null ||publishRideData?.dropLatLong?.positionMarker?.longitude === null) {
          DropDownHolder.dropDown.alertWithType('error','Error','Please select From location',);
        }
        if (publishRideData?.pickLatLong?.positionMarker?.longitude === null ||publishRideData?.pickLatLong?.positionMarker?.latitude === null) {
          DropDownHolder.dropDown.alertWithType('error','Error','Please select Destination location');
        }
        if (publishRideData?.time === null) {
          DropDownHolder.dropDown.alertWithType('error','Error','Please select time');
        }
      }
    }
    else{
      setVerificationModal(true)
    }
  };

  const handleApiCall =(data)=>{
    
    var params 
    
    if(data.rideType === 1){

      let selectiveDate = publishRideData?.time
      for (var i =0;i<selectiveDate.length;i++){
        selectiveDate[i].date = new Date(selectiveDate[i].date).toISOString()
      }
      params = {...data, selectiveDate}
    }

    else if (data.rideType ===2){
      let recurringDate ={
        startDate:publishRideData?.time[0]?.date,
        endDate:publishRideData?.time[publishRideData?.time.length -1]?.date,
        time:publishRideData?.time[1]?.time,
        utcTime:publishRideData?.time[0]?.utcTime
      } 
      params = {...data, recurringDate, days:publishRideData?.days}
    }
    if (publishRideData?.editType == true){
      params = { ...params, rideId:publishRideData?.id}
      dispatch(editRide(params, cancelToken.token, () => {navigation.navigate(PUBLISH_RIDES.publishRideDone)} ))
    }
    else {
    dispatch(publishRide(params, cancelToken.token, () => {navigation.navigate(PUBLISH_RIDES.publishRideDone)}));
    }
  }

  const handleSeatCount = data => {
    if (data === 'Minus') {
      if (seats > 1) {
        setSeats(seats - 1);
      }
    } else if (data === 'Plus') {
      if (seats < 4) {
        setSeats(seats + 1);
      }
    }
  };
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Header
          left={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(PUBLISH_RIDES.pickTimePublishRides)
              }>
              <Image source={Images.leftArrow} style={{tintColor: '#000000'}} resizeMode='cover'/>
            </TouchableOpacity>
          }
        />

        <View style={{padding: '5%'}}>
          <Text style={styles.headingText}>
            {strings.selectSeats.selectSeats}
          </Text>

          <View style={styles.seatsContainer}>
            <TouchableOpacity onPress={() => handleSeatCount('Minus')} style={{width: '30%'}}>
              <Image
                source={Images.minus}
                style={ seats === 1 ? {alignSelf: 'center', tintColor: '#000000040'} : {alignSelf: 'center', tintColor: '#00F9FF'} }
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: '40%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text style={styles.seatsText}> {seats} </Text>
            </View>
            <TouchableOpacity onPress={() => handleSeatCount('Plus')} style={{width: '30%'}}>
              <Image
                source={Images.plus}
                style={
                  seats === 4
                    ? {alignSelf: 'center', tintColor: '#000000040'}
                    : {alignSelf: 'center', tintColor: '#00F9FF'}
                }
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{padding: '5%', marginTop: '20%'}}>
          <Text style={styles.headingText}>
            {strings.selectSeats.bookInstantly}
          </Text>
        </View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={{flexDirection: 'column'}}>
            <Divider mainViewStyle={styles.divider} />

            <TouchableOpacity onPress={() => setChecked('yes')} style={{flexDirection: 'row', width: '100%'}}>
              <Text style={styles.checkboxText}>{strings.selectSeats.yes}</Text>
              <RadioButton.Android value="yes" status={checked === 'yes' ? 'checked' : 'unchecked'} color="#8913D1" onPress={() => setChecked('yes')}/>
            </TouchableOpacity>

            <Divider mainViewStyle={styles.divider} />

            <TouchableOpacity onPress={() => setChecked('no')} style={{flexDirection: 'row', width: '100%'}}>
              <Text style={styles.checkboxText}>{strings.selectSeats.no}</Text>
              <RadioButton.Android value="no" status={checked === 'no' ? 'checked' : 'unchecked'} color="#8913D1" onPress={() => setChecked('no')}/>
            </TouchableOpacity>

            <Divider mainViewStyle={styles.divider} />
          </View>

          <Button text={publishRideData?.editType == true?"Save":'Publish'} onPress={() => { handleNext() }} mainViewStyle={styles.searchButtonBlue} textStyle={styles.buttonText} disabled={publishRideData?.editType == true? isLoadingEdit :isLoading } Loading={publishRideData?.editType == true? isLoadingEdit :isLoading}/>

          <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={verificationModal}>
             <VerificationModal setVerificationModal={setVerificationModal} navigation={navigation}/>  
          </Overlay>

        </View>
      </SafeAreaView>
    </>
  );
};
