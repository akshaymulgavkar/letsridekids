import React, {useState} from 'react';
import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {PUBLISH_RIDES} from '../../constants/Navigation.Constants';
import {styles} from './PickDatesPublishRides.Styles';
import {CalendarView,Header} from '../../components';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {useDispatch, useSelector} from 'react-redux';
import {savePublishRideDate, savePublishRideDays} from '../../redux/actions/PublishRides.Action';
import {getPostRidesData} from '../../redux/selectors/PostRides.Selectors';

export const PickDatesPublishRides = ({navigation, route}) => {
  const [rideDate, setRideDate] = useState('');

  const getPublishRideData = useSelector(getPostRidesData);
  const {rideType} = getPublishRideData || '';
  const [days, setDays] = useState([])

  const dispatch = useDispatch();

  const handleNext = () => {

if (rideType === 'selectiveDays'){
 if (rideDate.length > 0) {
        dispatch(savePublishRideDays(days))
        dispatch(savePublishRideDate(rideDate))
        navigation.navigate(PUBLISH_RIDES.pickTimePublishRides)
      } else {
        DropDownHolder.dropDown.alertWithType('error','Error','Please select a date');
      }
}
else if (rideType === 'recurring'){
  if (days.length <= 0) {
    DropDownHolder.dropDown.alertWithType('error', 'Error', "Please selelect valid days")
  }
  else if (rideDate.length<2){
    DropDownHolder.dropDown.alertWithType('error', 'Error', "Please select a valid date range")
  }
 else if (rideDate.length > 1) {
    dispatch(savePublishRideDays(days))
    dispatch(savePublishRideDate(rideDate))
    navigation.navigate(PUBLISH_RIDES.pickTimePublishRides)
  } 
}

     
    }

    const handleBack=()=>{
      setDays([])
      setRideDate('')
      navigation.navigate(PUBLISH_RIDES.addStopOvers)
    }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <Header
          left={
            <TouchableOpacity onPress={() => handleBack()}>
              <Image source={Images.leftArrow} style={{tintColor: '#000000'}} />
            </TouchableOpacity>
          }
        />

          <Text style={styles.headingText}>
            {strings.selectDateTimePublishRides.selectDates}
          </Text>

        <View style={{width: '95%', alignSelf: 'center'}}>
            <CalendarView handleNext={handleNext} setRideDate={setRideDate} type={rideType} days={days} setDays={setDays}/>
        </View>
      </SafeAreaView>
    </>
  );
};
