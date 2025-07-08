import moment from 'moment';
import {Text} from 'react-native';
import { DateTime } from 'luxon'; 

export const dateHelper = dateInput => {
  let date= DateTime.fromISO(dateInput,  { zone: 'UTC' }).toFormat('dd LLLL yyyy')
  return <Text>{date}</Text>;
};

export const dateRangePicker = date => {
  let newDate = date?.split('T')
  let momentDate= moment(newDate[0]).format('YYYY-MM-DD')
  return momentDate;
};

export const timeHelper = time =>{
    return <Text>{moment(time).local().format('hh:mm A')}</Text>
}