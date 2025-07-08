import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { CalendarList} from 'react-native-calendars';
import {TimeZone, weekArray} from '../../constants/Values.Constants';
import {styles} from './Calendar.Styles';
import moment from 'moment';
import  { Button } from '../Button/Button';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { useSelector } from 'react-redux';
import { getPostRidesData } from '../../redux/selectors/PostRides.Selectors';
import { ScrollView } from 'react-native-gesture-handler';

export const CalendarView = props => {

  const getPostRideData = useSelector(getPostRidesData)

  const [markedDates, setMarkedDates] = useState({});

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState('')

  const {handleNext, setRideDate, type, days, setDays} = props;

  function getPreviousDay(date = new Date()) {
    
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
       
    return ((moment(previous).utcOffset('+0530').format('YYYY-MM-DD')))
  }
  
  const getSelectedDayEvents = date => {

    if (type === 'selectiveDays') {
      let markedDate = markedDates;

      if (markedDate.hasOwnProperty(date) == false) {
        markedDate[date] = {
          selected: true,
          color: '#00F9FF',
          textColor: '#000',
          startingDay: true,
          endingDay: true,
        };

        let serviceDate = moment(date);
        serviceDate = serviceDate.format('DD.MM.YYYY');
        setMarkedDates(markedDate);
        setRideDate(Object.keys(markedDates));

      } else if (markedDate.hasOwnProperty(date) == true) {
        let markedDate = markedDates;

        delete markedDate[date];

        let serviceDate = moment(date);
        serviceDate = serviceDate.format('DD.MM.YYYY');
        setMarkedDates(markedDate);
        setRideDate(Object.keys(markedDates));
      }
    } else if (type === 'recurring') {
      let markedDate = markedDates;
      if (startDate == '') {
        setStartDate(date);

        markedDate[date] = {
          startingDay: true,
          color: '#00F9FF',
        };
        setRideDate(Object.keys(markedDates));
      } else if (endDate == '') {
        if(date< startDate){
          DropDownHolder.dropDown.alertWithType('error', 'Error', 'Invalid date range selected')
        }else{

        setEndDate(date);
        let endDate = new Date(date)
        let previousDay = getPreviousDay(endDate)
        while (previousDay > startDate) {
          markedDate[previousDay] ={color: '#C7FEFF', textColor: 'white',textColor: 'gray'},
          previousDay = getPreviousDay(new Date(previousDay))
        }
        markedDate[date] = {
          selected: true,
          endingDay: true,
          color: '#00F9FF',
          textColor: 'gray',
        };
        setRideDate(Object.keys(markedDates));
        }
      } else {
        setStartDate('');
        setEndDate('');
        setMarkedDates({});

      }
    }
  };

  const handleEditRide = ()=>{
    let dates = getPostRideData?.date

    for (var i =0;i< dates.length;i++){
     getSelectedDayEvents(dates[i])
    }

 }

 const handleRecurring = () => {
  let dates = getPostRideData?.date
  let markedDate = markedDates;
  let startDate = dates[0]
  let endDate = dates[dates.length-1]
  setStartDate(startDate)
  setEndDate(endDate)
  markedDate[startDate] = {
    startingDay: true,
    color: '#00F9FF',
  };

  let previousDay = getPreviousDay(new Date(endDate))

  while (previousDay > startDate) {
    markedDate[previousDay] ={color: '#C7FEFF', textColor: 'white',textColor: 'gray'},
    previousDay = getPreviousDay(new Date(previousDay))
  }

  markedDate[endDate] = {
    selected: true,
    endingDay: true,
    color: '#00F9FF',
    textColor: 'gray',
  };
  setRideDate(Object.keys(markedDates));
 }

useEffect(() => {
  if (getPostRideData?.editType == true &&type === 'selectiveDays' ){
        handleEditRide()}
  else if (getPostRideData?.editType == true &&type === 'recurring' ){
    handleRecurring();
    setDays(getPostRideData?.days)
  }
}, [])


const handleDayFilter =(day)=>{
  setDays((oldarr)=>{return oldarr.includes(day) ? oldarr.filter((obj)=>obj!==day) : [...oldarr , day]})
}

  return (
    <View style={{height:'100%'}}>
      <View style={{flexDirection: 'row', marginTop: '5%', marginBottom:'5%'}}>
        {weekArray.map((ele, index) => {
          return (
            <View style={{flex: 1}} key={index}>
              <Text style={styles.weekdays}>{ele}</Text>
            </View>
          );
        })}
      </View>
      <View style={{height:type==='recurring'?'64%':'100%'}}>
      <CalendarList
        calendarStyle={{ alignSelf: 'center', height:type==='recurring'?null:'7.3%'}}
        minDate={new Date().toString()}
        maxDate={new Date(new Date().setMonth(new Date().getFullYear()+1))}
        pastScrollRange={0}
        futureScrollRange={12}
        firstDay={0}
        monthFormat={'MMMM'}
        scrollEnabled={true}
        hideDayNames={true}
        hideExtraDays={true}
        markedDates={markedDates}
        markingType={'period'}
        allowRangeSelection={true}
        onDayPress={day => {getSelectedDayEvents(day.dateString);}}
        theme={{todayTextColor: '#7954FA',}}
        renderHeader={xDate => (
          <Text style={styles.monthFormat}>
            {moment(xDate.getTime()).local().format('MMMM, YYYY')}
          </Text>
        )}
      />
       </View>
      
        {type === 'recurring' ? 
        <View style={{flexDirection:'column', borderTopColor:"#00000020", borderTopWidth:.5, bottom:30, backgroundColor:'#fff'}}>
        <Text style={styles.selectDaysText}>Select Days</Text>
        <View style={{flexDirection:'row', marginTop:'2%'}}>
        {weekArray.map((ele, index) => (
            <TouchableOpacity style={{width:'10%', marginRight:"5%", height:50, marginBottom:'2%'}}  key={index} onPress={()=>handleDayFilter(index)}>
            <View style={{ minWidth : 40,minHeight : 40,justifyContent :'center',alignItems :'center' , backgroundColor: days.includes(index) == true ?'#00F9FF' :'#d9d9d9' , borderRadius : 100}}>
            <Text style={styles.weekdays}> {ele}</Text> 
            </View>
          </TouchableOpacity>
            ))}
        </View>
        <Button text="Next" onPress={() => {handleNext()}} mainViewStyle={styles.mainViewStyle}/>
        </View> :

          <Button text="Next" onPress={() => {handleNext()}} mainViewStyle={{bottom:120, position:'absolute', width:"80%", alignSelf:'center'}}/>
        }
        
    </View>
  );
};
