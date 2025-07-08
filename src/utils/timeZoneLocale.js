import moment from 'moment-timezone';

export const timeZone=()=>{
    const data = moment.tz.guess();
    console.log('Timezone is', data)
    return data;

}