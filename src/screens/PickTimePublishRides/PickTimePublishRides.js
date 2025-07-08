import React, {useState, useEffect} from 'react';
import {View,Image,StatusBar,Text,TouchableOpacity,ScrollView} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {Button,Header} from '../../components';
import {PUBLISH_RIDES} from '../../constants/Navigation.Constants';
import {styles} from './PickTimePublishRides.Styles';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {useDispatch, useSelector} from 'react-redux';
import {savePublishRideTime} from '../../redux/actions/PublishRides.Action';
import {getPostRidesData} from '../../redux/selectors/PostRides.Selectors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export const PickTimePublishRides = ({navigation}) => {

  const getPublishRideData = useSelector(getPostRidesData);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const {date, rideType} = getPublishRideData || [];

  const [dateTimeArray, setDateTimeArray] = useState(date);
  const [selectedDate,setSelectedDate] =useState(0)


  function dateComparison(a, b) {
    const date1 = new Date(a)
    const date2 = new Date(b)
    
    return date1 - date2;
}

date.sort(dateComparison);

  useEffect(() => {
      const arr = [];
      for (var i = 0; i < date.length; i++) {
        var obj = {
          date: date[i],
          time: '',
          utcTime:''
        };
        arr.push(obj);
      }
      setDateTimeArray(arr);
  }, [getPublishRideData]);


  const handleNext = () => {
    if (rideType === 'recurring') {
      let obj = dateTimeArray;
      for (var i=0;i<obj.length;i++){
        obj[i].time =moment(time).format('HH:mm'); 
        obj[i].utcTime=obj[0]?.date+'T'+time.toISOString().split('T')[1]
      }
      dispatch(savePublishRideTime(obj));
      console.log(obj)
      navigation.navigate(PUBLISH_RIDES.pickSeatsPublishRides);
    } 
    else if (rideType == 'selectiveDays'){
      let flag = false
      let checkArray = []

      for (var i=0;i < dateTimeArray.length;i++){
        if (dateTimeArray[i].time === ''){
        flag = false
      }
      else {
        flag = true
      }
      checkArray.push(flag)
    }
    if (!checkArray.includes(false)) {
      dispatch(savePublishRideTime(dateTimeArray))
      navigation.navigate(PUBLISH_RIDES.pickSeatsPublishRides)
    }
    else {DropDownHolder.dropDown.alertWithType('error','Error','Please select time for all dates')}
  };
}

  const onChange = (selectedTime, index) => {
    console.log({selectedTime})
    let indexValue = index??selectedDate
    const currentDate = selectedTime || time;
    var arr = [...dateTimeArray]
    
    var tempDate = {...arr[indexValue]}
    for (var i =0; i<arr.length;i++){
      if (tempDate.date === arr[i].date){
        arr[i].time=moment(selectedTime).format('LT')
        arr[i].utcTime=date[indexValue]+'T'+selectedTime.toISOString().split('T')[1]
      }
    }
    setDateTimeArray(arr)
    setTime(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <Header
          left={
            <TouchableOpacity onPress={() =>
                navigation.navigate(PUBLISH_RIDES.pickDatesPublishRides)
              }>
              <Image source={Images.leftArrow} style={{tintColor: '#000000'}} resizeMode='contain'  />
            </TouchableOpacity>
          }
        />
        <View style={{padding: '5%'}}>
          <Text style={styles.headingText}>
            {strings.selectDateTimePublishRides.selectTime}
          </Text>
        </View>
        {rideType == 'selectiveDays' && (
          <View style={styles.dateContainer}>
            <ScrollView
              horizontal
              style={{flexGrow: 1}}
              showsHorizontalScrollIndicator={false}>
              {dateTimeArray.map((item, index) => (
                <TouchableOpacity
                style={index == selectedDate ? styles.dateCardChecked : styles.dateCardUnChecked}
                onPress={() =>{ setSelectedDate(index) 
                  onChange(time, index)}}
                  key={index}>
                  <Text style={styles.dateText}>
                    {moment(item?.date).local().format('MMM DD, YYYY')}
                    <Text> {item?.time} </Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.dateTimeContainer}>
        <DatePicker 
          date={time} 
          onDateChange={onChange} 
          mode={'time'}
          style={{alignSelf:'center'}}
          theme='light'
          androidVariant='nativeAndroid'
          />
        </View>
        <Button
          text="Next"
          onPress={() => {
            handleNext();
          }}
          mainViewStyle={styles.buttonContainer}
        />
      </SafeAreaView>
    </>
  );
};