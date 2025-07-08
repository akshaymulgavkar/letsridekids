import {Text, View, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './PickDates.Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {TABS} from '../../constants/Navigation.Constants';
import {strings} from '../../Localization/Localization';
import {useDispatch} from 'react-redux';
import {saveDate, saveDays} from '../../redux/actions/SearchRides.Action';
import {CalendarView,Header} from '../../components';
import { DropDownHolder } from '../../utils/DropDownHolder';

export const PickDates = ({navigation, route}) => {

  const dispatch = useDispatch();

  const {type} = route.params || ''

  const [rideDate,setRideDate] = useState('')
  const [days, setDays] = useState([])
  
  const handleDateValidation =()=>{

    if (type === 'recurring' && days.length<=0){
      DropDownHolder.dropDown.alertWithType('error', 'Error', "Please selelect valid days")
      return false
    }
    else if (type === 'recurring' && rideDate.length < 2 ){
        DropDownHolder.dropDown.alertWithType('error', "Error", "Please select a valid range")
        return false
    }

    else if (type === 'selectiveDays' && rideDate.length < 1){
      DropDownHolder.dropDown.alertWithType('error', "Error", "Please select a valid date")
      return false
    }

    return true
  }

  const handleNext = () => {
    
    const DateValidation = handleDateValidation()

 if (DateValidation){    
    dispatch(saveDate(rideDate));
    dispatch(saveDays(days))
    navigation.navigate(TABS.home);
  }

  };

  return (
    <>
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>

    <SafeAreaView style={styles.container}>
      <Header
          left={
              <Entypo name="cross" size={40} onPress={() => navigation.navigate(TABS.home)}/>
          }
        />

          <Text style={styles.headingText}>{strings.pickDates.selectSpecificDates}</Text>

        <View style={{width: '95%', alignSelf: 'center'}}>
          <CalendarView handleNext={handleNext} setRideDate={setRideDate} type={type} days={days} setDays={setDays}/>
        </View>
        
    </SafeAreaView>
    </>
  );
};

