import {Text,View,TouchableOpacity,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BottomSheet} from '@rneui/themed';
import {styles} from './TimePicker.Styles';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchRidesData} from '../../redux/selectors/SearchRides.Selectors';
import moment from 'moment';
import {saveSelectedTime} from '../../redux/actions/SearchRides.Action';
import DatePicker from 'react-native-date-picker';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { TimeZone } from '../../constants/Values.Constants';
import { dateHelper } from '../../utils/timeZoneHelper';

export const TimePicker = (props, {...touchableopacityProps}) => {

  const searchRides = useSelector(getSearchRidesData);
  const dispatch = useDispatch();
  const {setIsVisible, rideType} = props;
  const { date } = searchRides || []
  const [dateTimeArray, setDateTimeArray] = useState(date? date : []);
  const [selectedDate,setSelectedDate] =useState(0)

  useEffect(() => {
    if (date?.length >0 ) {
      const arr = [];
      for (var i = 0; i < date.length; i++) {
        var obj = {
          date: date[i],
          time: '',
        };
        arr.push(obj);
      }
      setDateTimeArray(arr);
    }
  }, [date]);

  const handleDone = () => {

    if (rideType === 'recurring'){
      let obj = dateTimeArray;
      for (var i=0;i<obj.length;i++){
        obj[i].time =moment(time).format('LT'); 
      }
      dispatch(saveSelectedTime(obj));
      setIsVisible(false);
    }

   else if (rideType === 'selectiveDays'){
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
   if (checkArray.includes(false)){
    DropDownHolder.dropDown.alertWithType('error','Error','Please select time for all dates');
   }
   else {
    setIsVisible(false);
    dispatch(saveSelectedTime(dateTimeArray));
   }
   }
  };

  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (selectedTime, index) => {
    const currentDate = selectedTime || time;
    var arr = dateTimeArray
    let indexCurrent = index||selectedDate
    
    var tempDate = arr[indexCurrent]

    for (var i =0; i<arr.length;i++){
      if (tempDate.date === arr[i].date){
        arr[i].time=moment(selectedTime).format('LT')
      }
    }
    setDateTimeArray(arr)
    setTime(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  return (
    <View>
      <BottomSheet isVisible={props.isVisible}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.textContainer}>
            <View style={{padding: 10, width: '70%'}}>
              <Text style={styles.dateTimeText}>Select Time</Text>
            </View>
            <View style={styles.doneBtnContainer}>
              <TouchableOpacity
                onPress={() => handleDone()}
                style={styles.doneBtn}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
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
                  onPress={() => {setSelectedDate(index)
                    onChange(time, index)}}
                  key={index}>
                  <Text style={styles.dateText}>
                    {moment(item.date).local().format('MMM DD, YYYY')}
                    <Text> {item.time} </Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
          <DatePicker 
          date={time} 
          onDateChange={onChange} 
          mode={'time'}
          style={{alignSelf:'center'}}
          theme='light'
          androidVariant='nativeAndroid'
          />
        </View>
      </BottomSheet>
    </View>
  );
};