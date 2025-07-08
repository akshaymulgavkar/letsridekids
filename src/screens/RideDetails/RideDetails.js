import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Divider, Button, fetchDistanceBetweenPoints, DateRangeSelect, VerificationModal, ShareRide, GetLiveLocation } from '../../components';
import { Images } from '../../assets/assets.path';
import { HOME } from '../../constants/Navigation.Constants';
import { styles } from './RideDetails.Styles';
import moment from 'moment';
import { getPreciseDistance } from 'geolib';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchRidesData } from '../../redux/selectors/SearchRides.Selectors';
import axios from 'axios';
import { Overlay } from '@rneui/themed';
import { TimeZone, weekArray } from '../../constants/Values.Constants';
import { bookRide, getDateDetails, TYPES } from '../../redux/actions/SearchRides.Action';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';
import { Rating } from 'react-native-rating-element';
import { getUser } from '../../redux/selectors/User.Selectors';
import { dateHelper, dateRangePicker, timeHelper } from '../../utils/timeZoneHelper';
import { timeZone } from '../../utils/timeZoneLocale';
export const RideDetails = ({ navigation, route }) => {
  const { data } = route.params || '';

  useEffect(() => {
    getCurrentLocation()
  }, [])

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

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_DATES_DETAILS], state));
  const isLoadingBooking = useSelector((state) => isLoadingSelector([TYPES.BOOK_RIDE], state))

  const searchRideData = useSelector(getSearchRidesData);
  const user = useSelector(getUser)

  const dispatch = useDispatch();

  const { dropLatLong, fromLatLong } = searchRideData || [];

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source())
  const [show, setShow] = useState(false)
  const [verificationModal, setVerificationModal] = useState(false)
  const [markedDates, setMarkedDates] = useState({})

  const calculateDistance = coordinates => {
    var dis = getPreciseDistance(
      { latitude: currentLocation?.latitude, longitude: currentLocation?.longitude },
      { latitude: coordinates[1], longitude: coordinates[0] },
    );
    return <Text>{parseFloat(dis / 1609.344).toFixed(2)} Miles</Text>;
  };


  const checkUserVerified = () => {
    if (user?.govtId?.isVerified === false) {
      return false
    }
    return true
  }

  const handleSelectDate = () => {
    if (checkUserVerified) {
      let params = {
        id: data?.ridePublishDetails?._id,
        currentDate: new Date().toISOString().substring(0, 10) + ':00:00.000+00:00'
      }
      dispatch(getDateDetails(params, (data) => {
        setShow(true)
        let markeddates = markedDates
        for (var i = 0; i < data.length; i++) {
          markeddates[dateRangePicker(data[i]?.date)] = {
            selected: true,
            color: data[i]?.availableSeatcount > 0 ? '#00F9FF' : '#FFDEDE',
            textColor: data[i]?.availableSeatcount > 0 ? '#000' : '#F54D4D',
            startingDay: true,
            endingDay: true
          };
        }
        setMarkedDates(markeddates)
      }))
    } else {
      setVerificationModal(true)
    }
  };

  const dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${data?.userDetail?.phone?.mobileNumber}`;
    }
    else {
      phoneNumber = `telprompt:${data?.userDetail?.phone?.mobileNumber}`;
    }

    Linking.openURL(phoneNumber);
  };

  const handleBookNow = () => {
    if (checkUserVerified) {
      let tz = timeZone()
      let params = {
        rideId: data?.ridePublishDetails?._id,
        rideDateId: [data.rideDatesDetails?._id],
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
        dispatch(bookRide(params, cancelToken, (roomId) => {
          navigation.navigate(HOME.bookingDone, { roomId: roomId })
        }))
      } catch (error) {
        console.log('error')
      }
    }
    else {
      setVerificationModal(true)
    }
  }

  const [ETAData, setETAData] = useState('');

  useEffect(() => {
    ETA(data?.fromlocation?.coordinates, data?.tolocation?.coordinates);
  }, []);
  const ETA = async (latLong1, latLong2) => {
    let data = await fetchDistanceBetweenPoints(latLong1, latLong2);
    setETAData(data);
  }

  const MapWeekDays = (days) => {

    return (
      <View style={{ flexDirection: 'row', marginTop: '4%', width: '100%' }}>
        {weekArray.map((ele, index) => (
          <View style={{ width: '10%', marginRight: "5%", height: 50, marginBottom: '2%' }} key={index}>
            <View style={{ minWidth: 40, minHeight: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: days?.includes(index) ? '#00F9FF' : '#00000040', borderRadius: 100 }}>
              <Text style={styles.weekdays}> {ele}</Text>
            </View>
          </View>
        ))}
      </View>)
  }

  return (
    <>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />

      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={{ height: '90%' }}>
          <View style={{ height: 230, backgroundColor: '#00000010' }}>
            <Header
              left={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={Images.leftArrow} style={{ tintColor: '#000000' }} resizeMode="cover" />
                </TouchableOpacity>
              }
              right={
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate(HOME.viewRoute, { coordinates: { data, currentLocation }, key: 'rideDetails' })}>
                  <Image source={Images.Map} style={{ marginRight: 5 }} />
                  <Text style={styles.routeText}>View route</Text>
                </TouchableOpacity>
              }
            />
            <View>
              <View style={[styles.upperContainer, { flexDirection: 'row' }]}>
                <View style={{ width: '5%', marginTop: '4%', marginStart: '2%' }}>
                  <Image source={Images.Ellipse} resizeMode="cover" />
                  <Image source={Images.LineExtra} style={{ left: '20%' }} resizeMode="cover" />
                  <Image source={Images.Ellipse} resizeMode="cover" />
                </View>

                <View style={{ width: '95%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                      <Text style={styles.fromToText}>From</Text>
                      <Text style={styles.fromText} numberOfLines={1}>{data?.ridePublishDetails?.fromAddress}</Text>
                      <Text style={styles.distanceText}>{calculateDistance(data?.ridePublishDetails?.fromlocation?.coordinates)} from your location</Text>
                    </View>
                  </View>

                  <View style={styles.lowerContainer}>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                      <Text style={styles.fromToText}>To</Text>
                      <Text style={styles.fromText} numberOfLines={1}> {data?.ridePublishDetails?.toAddress}</Text>
                      <Text style={styles.distanceText}> {calculateDistance(data?.ridePublishDetails?.tolocation?.coordinates)} from your location</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: '58%', backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7 }}>
              <View style={{ width: '15%', margin: 5 }}>
                <Image source={data?.userDetail?.profileImage ? { uri: data?.userDetail?.profileImage } : Images.profilePic} style={styles.profileImage} resizeMode="cover" />
              </View>

              <View style={{ flexDirection: 'row', width: '55%' }}>
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.nameText} numberOfLines={1}> {data?.userDetail?.fullname ?? data?.userDetail?.email?.mail}</Text>
                    <Image source={data?.userDetail?.govtId?.isVerified == true ? Images.verified : null} style={{ marginStart: '2%', alignSelf: 'center' }} />
                  </View>
                  <View style={{ flexDirection: 'row', top: '4%' }}>
                    <Image source={Images.RatingStar} />
                    <Text style={styles.rating}> {' '}{data?.userDetail?.userRating ? data?.userDetail?.userRating : '--'}</Text>
                  </View>
                </View>
              </View>

              {data?.userDetail?.phone?.isVerified && <TouchableOpacity onPress={() => dialCall()} style={{ marginTop: '5%', marginLeft: '10%' }}>
                <Image source={Images.CallFilled} />
              </TouchableOpacity>}
            </View>

            <View style={styles.detailsContainer}>
              <Divider mainViewStyle={styles.Divider} />

              <Text style={styles.dateTimeHeading}>Route & Stopovers</Text>

              <View style={styles.destinationContainer}>
                <Image source={Images.Ellipse} style={{ alignSelf: 'center', marginRight: '2%' }} />
                <Text style={styles.pickLocationText} numberOfLines={1}>{data?.ridePublishDetails?.fromAddress}</Text>
                <Text style={styles.pickLocationTimeText}>{timeHelper(data?.rideDatesDetails?.utcTime ?? data?.ridePublishDetails?.recurringDate?.utcTime)}</Text>

              </View>

              {data?.ridePublishDetails?.stops.map((item, index) => (
                <View key={index} style={styles.stopOverContainer}>
                  <Image source={Images.LineStopovers} style={{ position: 'absolute', bottom: '10%', left: '1%' }} />
                  <Image source={Images.ElipseGray} style={{ alignSelf: 'center', marginRight: '2%' }} />
                  <Text style={styles.pickStopsLocationText} numberOfLines={1}>{item?.address}</Text>
                </View>
              ))}

              <View style={styles.DateTimeContainer}>
                <Image source={Images.LineStopovers} style={{ position: 'absolute', bottom: '10%', left: '1%' }} />
                <Image source={Images.Ellipse} style={{ alignSelf: 'center', marginRight: '2%', top: '2%' }} />
                <Text style={[styles.pickLocationText, { top: '2%' }]} numberOfLines={1}>{data?.ridePublishDetails?.toAddress}</Text>
                {ETAData ? <Text style={styles.pickLocationTimeText}>{ETAData}</Text> : null}
              </View>

              <Divider mainViewStyle={[styles.Divider, { marginTop: '10%' }]} />

              <Text style={styles.dateTimeHeading}>Date & Time</Text>

              <View style={{ flexDirection: 'column' }}>
                {data?.ridePublishDetails?.rideType == 2 ? <Text style={styles.dateTimeText}> {dateHelper(data?.ridePublishDetails?.recurringDate?.startDate)} -{dateHelper(data?.ridePublishDetails?.recurringDate?.endDate)}{' '} | {timeHelper(data?.ridePublishDetails?.recurringDate?.utcTime)}</Text> : <Text style={styles.dateTimeText}> {dateHelper(data?.rideDatesDetails?.date)} |{' '} {timeHelper(data?.rideDatesDetails?.utcTime)}</Text>}
                <>{data?.ridePublishDetails?.rideType == 2 && MapWeekDays(data?.ridePublishDetails?.days)}</>
              </View>

              <Text style={styles.dateTimeHeading}>Total Passengers</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.dateTimeText, { width: '70%' }]}> {data?.seatCount} Passengers </Text>
                <View style={{ width: '30%', maxHeight: 20 }}>
                  <Rating readonly marginBetweenRatingIcon={2} rated={parseInt(data?.rideDatesDetails?.seatCount??data?.seatCount)-parseInt(data?.rideDatesDetails?.availableSeatcount??data?.availableSeatcount)} totalCount={data?.rideDatesDetails?.seatCount??data?.seatCount} size={25} direction="row-reverse" type="custom" selectedIconImage={Images.SeatsBooked} emptyIconImage={Images.SeatsFree} />
                </View>
              </View>
                <ShareRide date={data?.rideDatesDetails?.date??null} id={typeof (data?._id) === 'object' ? data?._id?.publisherId : data?._id}/>
              {data?.userDetail?.VehicleDetails?.vehicleNumber && <><Text style={styles.dateTimeHeading}>Car Details</Text>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '70%' }}>
                    <Text style={[styles.dateTimeText]}>{data?.userDetail?.VehicleDetails?.vehicleBrand} {data?.userDetail?.VehicleDetails?.vehicleModel} ({data?.userDetail?.VehicleDetails?.vehicleColor})</Text>
                    <Text style={[styles.dateTimeText]}>{data?.userDetail?.VehicleDetails?.vehicleNumber}</Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Image source={Images.car} style={{ height: 40, width: 120 }} resizeMode="contain" />
                  </View>
                </View>
              </>}
            </View>
          </View>
        </ScrollView>

        <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={show}>
          <DateRangeSelect markedDates={markedDates} setMarkedDates={setMarkedDates} setShow={setShow} data={data} navigation={navigation} />
        </Overlay>

        <View style={styles.BookBtn}>
          {data?.ridePublishDetails?.rideType == 2 ?
            <Button text="Select Date" mainViewStyle={{ width: '80%', alignSelf: 'center', marginTop: '2%' }} onPress={() => handleSelectDate()} Loading={isLoading} disabled={isLoading} /> :
            <Button text="Book Now" mainViewStyle={{ bottom: '10%', position: 'absolute', width: "80%", alignSelf: 'center' }} onPress={() => handleBookNow()} Loading={isLoadingBooking} disabled={isLoadingBooking} />}
        </View>

        <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={verificationModal}>
          <VerificationModal setVerificationModal={setVerificationModal} navigation={navigation} />
        </Overlay>

      </SafeAreaView>
    </>
  );
};
