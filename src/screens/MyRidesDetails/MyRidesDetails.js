import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Header,Divider,fetchDistanceBetweenPoints, GetLiveLocation } from '../../components';
import { Images } from '../../assets/assets.path';
import { HOME, RIDES, TABS } from '../../constants/Navigation.Constants';
import { styles } from './MyRidesDetails.Styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Overlay } from '@rneui/themed';
import { cancelBookedRide, changeStatusOfRide, deletePublishedRide, getBookingDetails, getPassengersDetails, getRidesStatus, passengerRateRide, rateDriverToPassengers } from '../../redux/actions/Rides.Actions';
import axios from 'axios';
import { saveEditType, saveFromLatLongPublish, savePostedRideId, savePublishRideDate, savePublishRideDays, saveRideBookingType, saveRideTypePublishRide, saveSeatsPublishRides, saveStopOvers, saveToLatLongPublish } from '../../redux/actions/PublishRides.Action';
import { TYPES } from '../../redux/actions/Rides.Actions';
import { Rating } from "react-native-rating-element";
import { TimeZone, weekArray } from '../../constants/Values.Constants';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { useIsFocused } from '@react-navigation/native';
import { CancelBookingModal, DeleteModal, PassengerDetails, RateBooking, RatingModal, RidesFooter, ShareRide, StartEndRideModal } from '../../components/MyRideDetails/MyRideDetails';
import { dateHelper, timeHelper } from '../../utils/timeZoneHelper';
import { DropDownHolder } from '../../utils/DropDownHolder';
import { timeZone } from '../../utils/timeZoneLocale';

export const MyRidesDetails = ({ navigation, route }) => {

  const { data, key, vehicleDetails } = route.params || [];

  const isFocused = useIsFocused();

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RATE_DRIVER_TO_PASSENGERS], state));
  const isDeleteLoading = useSelector((state) => isLoadingSelector([TYPES.DELETE_POSTED_RIDE], state));
  const isCancelLoading = useSelector((state) => isLoadingSelector([TYPES.CANCEL_BOOKED_RIDE], state))
  const isStartRideLoading = useSelector((state) => isLoadingSelector([TYPES.CHANGE_RIDE_STATUS], state))
  const isPassengerRatingLoading = useSelector((state) => isLoadingSelector([TYPES.PASSENGER_RATING], state))


  const dispatch = useDispatch();

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [rideStatus, setRideStatus] = useState('upcoming')
  const [deleteTodayRide, setDeleteTodayRide] = useState(false)
  const [bookingId, setBookingId] = useState([])
  const [rating, setRating] = useState(0)
  const [ratingData, setRatingData] = useState([])
  const [scrollData, setScrollData] = useState([])

  const [visible, setVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [ratingModal, setRatingModal] = useState(false)
  const [startEndRideModal, setStartEndRideModal] = useState({
    visible:false,
    text:''
  })

  const [deleteLoading,setDeleteLoading] = useState({
    today:false,
    upcoming:false,
    all:false
  })

  useEffect(() => {
    if (!isDeleteLoading) {
      setDeleteLoading({
          today: false,
          upcoming: false,
          all: false
        })
    }
}, [isDeleteLoading])

  const [ETAData, setETAData] = useState('');

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getCurrentLocation = async () => {
    const { latitude, longitude, heading } = await GetLiveLocation()
    setCurrentLocation({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        })
  };

  const rideTodayCheck = () => {
    if (data?.rideType == 2) {
      if ((moment(data?.recurringDate?.startDate).local().format('MMM DD, YYYY') <= moment(new Date()).local().format('MMM DD, YYYY')) && (moment(data?.recurringDate?.endDate).local().format('MMM DD, YYYY') >= moment(new Date()).local().format('MMM DD, YYYY'))) {
        setDeleteTodayRide(true)
      }
    }
  }

  const [rideStatusLoading, setRideStatusLoading] = useState(true)

  const getRideStatus = () => {
    let params = {
      currentDate: new Date().toISOString().substring(0, 10) + ':00:00.000+00:00',
      rideId:data?._id
    }
    
    dispatch(getRidesStatus(params, cancelToken.token, (data) => {
      if (data?.message === "you dont have any booking for today") {
        setRideStatus('upcoming')
        setBookingId([])
      }
      else {
        setRideStatus(data?.data?.[0]?.rideBookStatus)
        setBookingId(data?.data?.map(e => e?._id))
      }
    }))
    
   setTimeout(() => {
    setRideStatusLoading(false)
   }, 750);
  }

  const getScrollData=()=>{
    let params = {
      riderId: data?._id
    }
    dispatch(getBookingDetails(params, cancelToken.token, (data) => {
      setScrollData(data)
    }))
  
  }

  useEffect(() => {
    getCurrentLocation();
    rideTodayCheck()
    {key=='myPublished'&& getRideStatus()}
    {key=='myPublished' && getScrollData()}
  }, [isFocused]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const ratingCompleted = rating => {
    setRating(rating)
  };

  const handleCancelRide = (date) => {
    let params = { date: date, rideDetailsId: data?.rideDetailId, bookingId: data?._bookingId };
    console.log({params})
    dispatch(cancelBookedRide(params, cancelToken.token, () => { navigation.navigate(TABS.rides) }));
  };

  const handleDeleteRide = (date, type, loader) => {
    setDeleteLoading(loader)
    let params = {
      rideId: data?._id,
      currentDate: date,
      userId: data?.userId,
      DeletionType: type
    }
    dispatch(deletePublishedRide(params, cancelToken.token, () => { navigation.navigate(TABS.rides) }));
  }

  const handleEditRide = () => {
    if (scrollData?.length>0){
      DropDownHolder.dropDown.alertWithType('error', 'Alert!', 'This carpool cannot be edited as this includes bookings.')
    }
    else
    {
      let editData = {
        checked: data?.rideType === 1 ? 'selectiveDays' : 'recurring',
        pickLatLong: { positionMarker: { latitude: data?.fromlocation?.coordinates[1], longitude: data?.fromlocation?.coordinates[0] }, address: data?.fromlocation?.fromAddress },
        dropLatLong: { positionMarker: { latitude: data?.tolocation?.coordinates[1], longitude: data?.tolocation?.coordinates[0] }, address: data?.tolocation?.toAddress },
        arr: data?.stops.map(item => { return { address: item?.address, coordinates: item?.coordinates } }),
        date: data?.rideType === 1 ? data?.selectiveDate.map(item => { return moment(item?.date).local().format('YYYY-MM-DD')}) : [moment(data?.recurringDate?.startDate).local().format('YYYY-MM-DD'), moment(data?.recurringDate?.endDate).local().format('YYYY-MM-DD')],
        days: data?.days,
        time: data?.rideType === 1 ? data?.selectiveDate?.map(item => { return { date: item?.date, time: item?.time } }) : data?.recurringDate?.time
      };
      dispatch(saveRideTypePublishRide(editData?.checked))
      dispatch(saveFromLatLongPublish(editData?.pickLatLong))
      dispatch(saveToLatLongPublish(editData?.dropLatLong))
      dispatch(saveStopOvers(editData?.arr))
      dispatch(saveSeatsPublishRides(data?.seatCount))
      dispatch(saveRideBookingType(data?.instantBook ? 'yes' : 'no'))
      dispatch(savePostedRideId(data?._id))
      dispatch(saveEditType(true))
      dispatch(savePublishRideDays(editData?.days))
      dispatch(savePublishRideDate(editData?.date))
      dispatch(savePublishRideDays(editData?.days))
      navigation.navigate(TABS.publishRides)
    }
  };

  useEffect(() => {
    ETA(data?.fromlocation?.coordinates, data?.tolocation?.coordinates);
  }, []);
  const ETA = async (latLong1, latLong2) => {
    let data = await fetchDistanceBetweenPoints(latLong1, latLong2);
    setETAData(data);
  };

  const MapWeekDays = (days) => {

    return (
      <View style={{ flexDirection: 'row', marginTop: '4%', width: '100%' }}>
        {weekArray.map((ele, index) => (
          <View style={{ width: '10%', marginRight: "5%", height: 50 }} key={index}>
            <View style={{ minWidth: 40, minHeight: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: days?.includes(index) ? '#00F9FF' : '#00000040', borderRadius: 100 }}>
              <Text style={styles.weekdays}> {ele}</Text>
            </View>
          </View>
        ))}
      </View>)
  }

  const handleTrack=(key)=>{
    navigation.navigate(RIDES.trackRide, { coordinates: { data, currentLocation } , key:key})
  }

  const toggleStartEndRide=() => {
    console.log('Toggling')
      if (rideStatus == 'upcoming'){
        setStartEndRideModal({
          visible: true,
          text: 'start'
        })
      }
      else if (rideStatus == 'ongoing'){
        setStartEndRideModal({
          visible: true,
          text: 'end'
        })
      }
  }

  const handleStartEndRide = () => {
    if (rideStatus == 'upcoming') {
      if (bookingId.length > 0) {
        let params = {
          BookingId: bookingId
        }
        dispatch(changeStatusOfRide(params, cancelToken.token, () => handleTrack('Publish')))
      }
      else {
        handleTrack('Publish')
        alert("You have no Rides booked,Thank you for posting this ride,Continue your safe Ride ")
      }
    } else {
      let params = {
        BookingId: bookingId
      }
      dispatch(changeStatusOfRide(params, cancelToken.token, () => {
        let params = {
          riderId: data?._id
        }
        dispatch(getPassengersDetails(params, cancelToken.token, (data) => {

          let temp = data.map((item, index) => {
            return ({
              'bookingId': item?.bookingId,
              'passengerID': item?.userDetail?._id,
              'passengerRating': 0,
              'fullname': item?.userDetail?.fullname

            })
          })
          setRatingData(temp)
          setRatingModal(true)
        }))
      }))
    }
  }


  const handleRatingRide = () => {
    let params = {
      'ratingStars': rating,
      'bookingId': data?._id,
      'riderId': data?.publihserDetail?._id
    }

    dispatch(passengerRateRide(params, cancelToken.token, () => {
      toggleOverlay()
      navigation.navigate(TABS.rides)
    }))
  }

  function onFinishRating(e, id) {
    setRatingData((temp) => {
      let array = [...temp]
      for (var i = 0; i < array.length; i++) {
        if (array[i]?.passengerID === id) {
          array[i].passengerRating = e
        }
      }
      return array
    })
  }

  const handleDone = () => {
    try {
      let params = ratingData
      dispatch(rateDriverToPassengers(params, cancelToken.token, () => {
        setRatingModal(false)
        navigation.navigate(TABS.rides)
      }))
    } catch (error) {
      console.log('error is', error)
    }
  }

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${data?.publihserDetail?.phone?.mobileNumber}`;
    }
    else {
      phoneNumber = `telprompt:${data?.publihserDetail?.phone?.mobileNumber}`;
    }
    Linking.openURL(phoneNumber);
  };
console.log(data?.rideDetailId)
  return (
    <>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />

      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View style={styles.header}>
            <Header left={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Images.leftArrow} style={{ tintColor: '#000000' }} resizeMode="cover" />
              </TouchableOpacity>
            }
              right={<TouchableOpacity onPress={() => navigation.navigate(HOME.viewRoute, { coordinates: { data, currentLocation } })} style={{ flexDirection: 'row' }}>
                <Image source={Images.Map} style={{ right: '20%' }} />
                <Text style={styles.routeText}>View Route</Text>
              </TouchableOpacity>
              } />

            <View style={[styles.upperContainer, { flexDirection: 'row' }]}>
              <View style={{ width: '5%', marginTop: '4%', marginStart: '2%' }}>
                <Image source={Images.Ellipse} resizeMode="cover" />
                <Image source={Images.LineExtra} style={{ left: '20%' }} resizeMode="cover" />
                <Image source={Images.Ellipse} resizeMode="cover" />
              </View>

              <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', width: '95%' }}>
                  <View style={{ flexDirection: 'column', width: '100%' }}>
                    <Text style={styles.fromToText}>From</Text>
                    <Text style={styles.fromText} numberOfLines={1}> {data?.fromlocation?.fromAddress} </Text>
                  </View>
                </View>

                <View style={styles.lowerContainer}>
                  <View style={{ flexDirection: 'column', width: '100%' }}>
                    <Text style={styles.fromToText}>To</Text>
                    <Text style={styles.fromText} numberOfLines={1}> {data?.tolocation?.toAddress} </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: '70%', backgroundColor: '#fff' }}>
            {key === 'myBookings' && (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 5 }}>
                  <Image source={data?.publihserDetail?.profileImage ? { uri: data?.publihserDetail?.profileImage } : Images.profilePic} style={styles.profileImage} resizeMode="cover" />
                </View>

                <View style={{ flexDirection: 'column', marginStart: '2%', alignSelf: 'center' }}>
                  <Text style={data?.publihserDetail?.fullname ?styles.nameText:[styles.nameText, {width:'80%'}]} numberOfLines={1}> {data?.publihserDetail?.fullname ?? data?.publihserDetail?.email?.mail}</Text>
                  <View style={{ flexDirection: 'row', top: '4%' }}>
                    <Image source={Images.RatingStar} />
                    <Text style={styles.rating}> {data.publihserDetail?.userRating ? data.publihserDetail?.userRating : '--'}</Text>
                  </View>
                </View>
                <View style={styles.rideStatusContainer}>
                  <View style={[styles.rideStatusCard, { backgroundColor: data?.rideBookStatus === 'upcoming' || data?.rideBookStatus === 'pending' ? '#FFF5E1' : data?.rideBookStatus === 'ongoing' ? '#00FFFF' : data?.rideBookStatus === 'cancelled' ? '#b1200030' : '#E5FFE1' }]}>
                    <Text style={[styles.rideStatusText, { color: data?.rideBookStatus === 'upcoming' || data?.rideBookStatus === 'pending' ? '#BF9709' : data?.rideBookStatus === 'ongoing' ? 'blue' : data?.rideBookStatus === 'cancelled' ? '#b12' : '#17A500' }]}>{data?.rideBookStatus === 'upcoming' ? "Upcoming" : data?.rideBookStatus === 'pending' ? "Pending" : data?.rideBookStatus === 'ongoing' ? 'On going' : data?.rideBookStatus === 'cancelled' ? 'Cancelled' : 'Completed'}</Text>
                  </View>

                  {data?.publihserDetail?.phone?.isVerified && <TouchableOpacity onPress={() => dialCall()} style={{ marginTop: '5%', marginLeft: '10%' }}>
                    <Image source={Images.CallFilled} />
                  </TouchableOpacity>}

                </View>
                <Divider mainViewStyle={styles.Divider} />
              </View>
            )}

            <View style={styles.detailsContainer}>
              <View style={{ flexDirection: 'row', marginTop: '7%' }}>
                <Text style={styles.dateTimeHeading}>Route & Stopovers</Text>
                <View style={styles.rideTypeContainer}>
                  <Text style={styles.rideTypeText}>
                    {data?.rideType === 1 ? 'One-Time Ride' : 'Recurring'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: '8%' }}>
                <Image source={Images.Ellipse} style={{ alignSelf: 'center', marginRight: '2%' }} />
                <Text style={styles.pickLocationText} numberOfLines={1}>
                  {data?.fromlocation?.fromAddress}
                </Text>
                {key === 'myBookings' ? (
                  <Text style={styles.pickLocationTimeText}>
                    {data?.rideType ==1 ?timeHelper(data?.selectiveDate[0]?.utcTime):timeHelper(data?.recurringDate?.utcTime)}
                  </Text>
                ) : data?.rideType === 1 ? (<Text style={styles.pickLocationTimeText}>
                  {timeHelper(data?.selectiveDate[0]?.utcTime)}
                </Text>) : <Text style={styles.pickLocationTimeText}>{timeHelper(data?.recurringDate?.utcTime)}</Text>}
              </View>

              {data?.stops?.map(item => (
                <View key={item?._id} style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: '8%' }}>
                  <Image source={Images.LineStopovers} style={{ position: 'absolute', bottom: '10%', left: '1%' }} />
                  <Image source={Images.ElipseGray} style={{ alignSelf: 'center', marginRight: '2%' }} />
                  <Text style={styles.pickStopsLocationText} numberOfLines={1}>{item?.address}</Text>
                </View>
              ))}

              <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', marginTop: '8%' }}>
                <Image source={Images.LineStopovers} style={{ position: 'absolute', bottom: '10%', left: '1%' }} />
                <Image source={Images.Ellipse} style={{ alignSelf: 'center', marginRight: '2%', top: '2%' }} />
                <Text style={[styles.pickLocationText, { top: '2%' }]} numberOfLines={1}>{data?.tolocation?.toAddress}</Text>
                <Text style={styles.pickLocationTimeText}>{ETAData}</Text>
              </View>

              <Divider mainViewStyle={[styles.Divider, { marginTop: '10%' }]} />

              <Text style={styles.dateTimeHeading}>Date & Time</Text>

              <View style={{ flexDirection: 'row' }}>{
                data?.rideType === 1 ? (
                  key === 'myBookings' ?
                    (<View style={{ flexDirection: 'column', marginTop: '1%' }}><Text style={styles.dateTimeText}>{dateHelper(data?.rideDateDetails?.date)} -{' '}{timeHelper(data?.selectiveDate[0]?.utcTime)}</Text></View>)
                    : <View style={{ flexDirection: 'column', marginTop: '1%' }}>{data?.selectiveDate?.map((item, index) => (<Text key={index} style={styles.dateTimeText}>{dateHelper(item?.date)} -{' '}{timeHelper(item?.utcTime)}</Text>))}</View>
                ) :
                  data?.rideType === 2 ?
                    (
                      key === 'myBookings' ?
                        (<Text style={styles.dateTimeText}>
                          {dateHelper(data?.recurringStartDate)}{' '}-{' '} {dateHelper(data?.recurringEndDate)}{' '}| {timeHelper(data?.recurringDate?.utcTime)}
                        </Text>) :
                        <Text style={styles.dateTimeText}>
                          {dateHelper(data?.recurringDate?.startDate)}{' '}-{' '} {dateHelper(data?.recurringDate?.endDate)}{' '}| {timeHelper(data?.recurringDate?.utcTime)}
                        </Text>
                    ) : null}
              </View>
              <>{data?.rideType == 2 && MapWeekDays(data?.days)}</>


              <Text style={[styles.dateTimeHeading, { marginTop: '10%' }]}>Total Passengers</Text>

              <View style={{ flexDirection: 'row' }}>
                {key === 'myBookings' ? <Text style={[styles.dateTimeText, { width: '65%' }]}>{data?.seatCount} Passengers </Text> : <Text style={[styles.dateTimeText, { width: '65%' }]}>{data?.seatCount} Passengers</Text>}
                <View style={{ width: '35%', maxHeight: 20 }}>
                  <Rating readonly marginBetweenRatingIcon={2} rated={key === 'myBookings' ? data?.rideDateDetails?.seatCount - data?.rideDateDetails?.availableSeatcount : data?.seatCount - data?.availableSeats} totalCount={key === 'myBookings' ? data?.rideDateDetails?.seatCount : data?.seatCount} size={25} direction="row-reverse" type="custom" selectedIconImage={Images.SeatsBooked} emptyIconImage={Images.SeatsFree} />
                </View>
              </View>
              {key ==='myPublished' ? 
              <PassengerDetails scrollData={scrollData}/>:
              vehicleDetails?.vehicleNumber &&
              <>
              <Text style={[styles.dateTimeHeading, { marginTop: '10%' }]}>Car Details</Text>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '70%' }}>
                  <Text style={[styles.dateTimeText]}>{vehicleDetails?.vehicleBrand} {vehicleDetails?.vehicleModel} ({vehicleDetails?.vehicleColor})</Text>
                  <Text style={[styles.dateTimeText]}>{vehicleDetails?.vehicleNumber}</Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Image source={Images.car} style={{ height: 40, width: 120 }} resizeMode="contain" />
                </View>
              </View>
            </>}
            <ShareRide id={key == 'myBookings'? data?.rideDetailId :data?._id} date={data?.selectiveDate?.length>0?data?.selectiveDate[0]?.date:null}/>
            </View>
          </View>
        </ScrollView>
        
        <RidesFooter data={data} keyValue={key} rideStatus={rideStatus} toggleOverlay={toggleOverlay} setCancelModal={setCancelModal} setDeleteModal={setDeleteModal} handleEditRide={handleEditRide} isStartRideLoading={isStartRideLoading} rideStatusLoading={rideStatusLoading} toggleStartEndRide={toggleStartEndRide} handleTrack={handleTrack}/>
          <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={visible||cancelModal||ratingModal||deleteModal|| startEndRideModal.visible}>
           {visible? <RateBooking rating={rating} ratingCompleted={ratingCompleted} handleRatingRide={handleRatingRide} isPassengerRatingLoading={isPassengerRatingLoading} setVisible={setVisible} isStartRideLoading={isStartRideLoading}/>
          :cancelModal? <CancelBookingModal setCancelModal={setCancelModal} data={data} isCancelLoading={isCancelLoading} handleCancelRide={handleCancelRide} deleteTodayRide={deleteTodayRide}/>
          :deleteModal? <DeleteModal setDeleteModal={setDeleteModal} data={data} isDeleteLoading={isDeleteLoading} deleteTodayRide={deleteTodayRide} handleDeleteRide={handleDeleteRide} deleteLoading={deleteLoading}/>
          :ratingModal? <RatingModal setRatingModal={setRatingModal} ratingData={ratingData} onFinishRating={onFinishRating} handleDone={handleDone} isLoading={isLoading}/>
          :startEndRideModal.visible===true? <StartEndRideModal setStartEndRideModal={setStartEndRideModal} startEndRideModal={startEndRideModal} handleStartEndRide={handleStartEndRide}/>:null }
          </Overlay>
      </SafeAreaView>
    </>
  );
};