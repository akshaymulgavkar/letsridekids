import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '../Button/Button';
import { CalendarList } from 'react-native-calendars';
import { styles } from './DateRangeSelect.Styles'
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchRidesData } from '../../redux/selectors/SearchRides.Selectors';
import { bookRide, TYPES } from '../../redux/actions/SearchRides.Action';
import axios from 'axios';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { TimeZone, weekArray } from '../../constants/Values.Constants';
import { HOME } from '../../constants/Navigation.Constants';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { getUser } from '../../redux/selectors/User.Selectors';
import { Overlay } from '@rneui/themed';
import { VerificationModal } from '../VerificationModal/VerificationModal';
import { timeZone } from '../../utils/timeZoneLocale';
import { dateRangePicker } from '../../utils/timeZoneHelper';

export const DateRangeSelect = (props) => {

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.BOOK_RIDE], state));
  const user = useSelector(getUser)

  const checkUserVerified = () => {
    if (user?.govtId?.isVerified === false) {
      console.log('user is unverified')
      return false
    }
    return true
  }

  const getBookingdata = useSelector(getSearchRidesData)
  const searchRideData = useSelector(getSearchRidesData);
  const { dropLatLong, fromLatLong } = searchRideData ||[];

  const dispatch = useDispatch();


  const { markedDates, setMarkedDates, setShow, data, navigation } = props || ''
  console.log({markedDates})

  const [dates, setDates] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [idData, setIdData] = useState([])
  const [verificationModal, setVerificationModal] = useState(false)
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source())

  useEffect(() => {
    setDates(getBookingdata?.bookRideData?.data.filter(item => { return item.availableSeatcount > 0 }).map((item) => { return (dateRangePicker(item?.date)) }))
    setSelectedDates(getBookingdata?.bookRideData?.data.filter(item => { return item.availableSeatcount > 0 }).map((item) => { return (dateRangePicker(item?.date)) }))
    setIdData(getBookingdata?.bookRideData?.data.filter(item => { return item.availableSeatcount > 0 }).map((item) => { return (item?._id) }))
  }, [getBookingdata?.bookRideData])


  const getSelectedDayEvents = date => {

    var id = getBookingdata?.bookRideData?.data?.filter(ele => (dateRangePicker(ele?.date)) === date).map(item => item?._id)
    if (dates.includes(date)) {

      let markedDate = markedDates;
      if (selectedDates.includes(date)) {
        markedDate[date] = {
          selected: true,
          color: '#00000050',
          textColor: '#000',
          startingDay: true,
          endingDay: true,
        }
        setIdData((oldArr) => {
          return oldArr.filter(item => item !== id[0])
        })
        setMarkedDates(markedDate)
        setSelectedDates((oldArr) => { return oldArr.filter(ele => ele !== date) })
      }
      else if (selectedDates.includes(date) === false) {
        markedDate[date] = {
          selected: true,
          color: '#00F9FF',
          textColor: '#000',
          startingDay: true,
          endingDay: true,
        }
        setIdData((oldArr) => { return ([...oldArr, id[0]]) })
        setMarkedDates(markedDate)
        setSelectedDates((oldArr) => { return ([...oldArr, date]) })
      }
    }
  }

  const handleBookNow = () => {
    const checkuserverified = checkUserVerified()

    if (checkuserverified) {

      let rideId = typeof (data?._id) === 'object' ? data?._id?.publisherId : data?._id
      let tz = timeZone()
      let params = {
        rideId: rideId,
        rideDateId: idData,
        seats: searchRideData?.SEATS??1,
        fromAddress: data?.ridePublishDetails?.fromAddress,
        toAdress: data?.ridePublishDetails?.toAddress,
        fromLong: data?.fromlocation?.coordinates[0],
        fromLat: data?.fromlocation?.coordinates[1],
        toLong: data?.tolocation?.coordinates[0],
        toLat: data?.tolocation?.coordinates[1],
        userTz:tz
      }
      try {
        if (params?.rideDateId.length > 0) {
          dispatch(bookRide(params, cancelToken, (roomId) => {
            setShow(false)
            navigation.navigate(HOME.bookingDone, { roomId: roomId })
          }))
        } else {
          DropDownHolder.dropDown.alertWithType('error', 'Error', "Please select valid dates")
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    else {
      setVerificationModal(true)
    }
  }

  return (
    <View style={{ backgroundColor: '#ffffff', borderRadius: 10 }}>

      <Entypo name="cross" size={35} onPress={() => setShow(false)} style={{ padding: 5 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.dateTimeHeading, { marginStart: 10 }]}>Select Date Range</Text>

        <View style={{ alignSelf: 'flex-end', marginRight: '2%' }}>
          <View style={{ backgroundColor: '#b12', width: 5, height: 5, top: '35%', borderRadius: 100 }} />
          <Text style={styles.alreadyBookedText}>Booked</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: '50%' }}>
        <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center' }}>{weekArray.map((ele, index) => {
          return (
            <View style={{ flex: 1 }} key={index}>
              <Text style={styles.weekdays}>{ele}</Text>
            </View>)
        })}
        </View>
        <View style={{ height: '80%' }}>
          <CalendarList
            calendarStyle={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}
            minDate={new Date().toString()}
            maxDate={new Date(new Date().setMonth(new Date().getFullYear() + 1))}
            pastScrollRange={0}
            futureScrollRange={12}
            firstDay={0}
            monthFormat={'MMMM'}
            scrollEnabled={true}
            hideDayNames={true}
            hideExtraDays={true}
            markedDates={markedDates}
            markingType={'period'}
            disabledByDefault
            allowRangeSelection={true}
            onDayPress={day => { getSelectedDayEvents(day.dateString) }}
            theme={{ todayTextColor: '#7954FA' }}
            renderHeader={xDate => (<Text style={styles.monthFormat}>{moment(xDate.getTime()).format('MMMM, YYYY')}</Text>)}
          />
        </View>
      </ScrollView>

      {dates?.length > 0 ? <Button mainViewStyle={{ bottom: '12%', position: 'absolute', width: "80%", alignSelf: 'center' }} text="Book Now" onPress={() => handleBookNow()} Loading={isLoading} disabled={isLoading} />
        : <Button mainViewStyle={{ bottom: '12%', position: 'absolute', width: "80%", alignSelf: 'center' }} text="All Seats Booked" onPress={() => setShow(false)} Loading={isLoading} disabled={isLoading} />
      }
      <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={verificationModal}>
        <VerificationModal setVerificationModal={setVerificationModal} navigation={navigation} />
      </Overlay>
    </View>
  )
}
