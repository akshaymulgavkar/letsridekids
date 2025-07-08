import React, {useState} from 'react';
import { View, StyleSheet, Image, StatusBar, Text, ScrollView, TouchableOpacity} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {RadioButton} from 'react-native-paper';
import {styles} from './Home.Styles';
import {Button,TimePicker,SeatPicker} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Fonts} from '../../theme/Fonts';
import {HOME} from '../../constants/Navigation.Constants';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { clearTime, saveSeats, searchRide} from '../../redux/actions/SearchRides.Action';
import {getSearchRidesData} from '../../redux/selectors/SearchRides.Selectors';
import moment from 'moment';
import { saveRideType, saveToLatLong, saveFromLatLong, TYPES} from '../../redux/actions/SearchRides.Action';
import {DropDownHolder} from '../../utils/DropDownHolder';
import {Overlay} from '@rneui/themed';
import {isLoadingSelector} from '../../redux/selectors/Status.Selectors';
import {TimeZone} from '../../constants/Values.Constants';
import { dateHelper } from '../../utils/timeZoneHelper';

export const Home = ({navigation}) => {
  const searchRidesData = useSelector(getSearchRidesData);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_RIDE], state),
  );

  const [checked, setChecked] = useState( searchRidesData?.rideType ? searchRidesData?.rideType : 'selectiveDays');
  const [isVisible, setIsVisible] = useState(false);
  const [seatsVisible, setSeatsVisible] = useState(false);
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [seats, setSeats] = useState(getSearchRidesData?.seats ? getSearchRidesData?.seats : 1);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const dispatch = useDispatch();

  let searchData = {
    fromLatLong: {
      lat: searchRidesData?.fromLatLong?.positionMarker.latitude,
      long: searchRidesData?.fromLatLong?.positionMarker.longitude,
    },
    destinationLatLong: {
      lat: searchRidesData?.dropLatLong?.positionMarker.latitude,
      long: searchRidesData?.dropLatLong?.positionMarker.longitude,
    },
    date: searchRidesData?.time,
    days: searchRidesData?.days,
  };

  const handleSearchApi = () => {
    if (
      searchRidesData?.date != undefined &&
      searchRidesData?.dropLatLong != undefined &&
      searchRidesData?.fromLatLong != undefined &&
      seats != '' &&
      searchRidesData?.time != undefined && 
      searchRidesData?.time != null 
    ) {
      let params = {
        fromlatitude: searchData?.fromLatLong?.lat,
        fromlongitude: searchData?.fromLatLong?.long,
        tolongitude: searchData?.destinationLatLong?.long,
        tolatitude: searchData?.destinationLatLong?.lat,
        recurringDate: checked === 'recurring' ? searchData?.date : null,
        selectiveDate:
          checked === 'selectiveDays' ? searchRidesData?.time : null,
        seatCount: parseInt(seats),
        rideType: checked === 'selectiveDays' ? 1 : 2,
      };
      dispatch(saveRideType(checked));
      dispatch(saveSeats(seats));
      handleApiCall(params);
    } else {
      if (searchRidesData?.fromLatLong === undefined) {
        DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select from location');
      } else if (searchRidesData?.dropLatLong === undefined) {
        DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select destination location');
      } else if (searchRidesData?.date === undefined) {
        DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select date');
      } else if (searchRidesData?.time === undefined || searchRidesData?.time== null) {
        DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select time');
      } else if (seats === '') {
        DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select seats');
      }
    }
  };

  const handleApiCall = data => {

    try {
      var params;
      if (data.rideType === 1) {
        let selectiveDate = searchRidesData?.time;
        for (var i = 0; i < selectiveDate.length; i++) {
          selectiveDate[i].date = new Date(selectiveDate[i].date).toISOString();
        }
        params = {...data, selectiveDate};
      } else if (data.rideType === 2) {
        let recurringDate = {
          startDate: searchRidesData?.time[0].date,
          endDate: searchRidesData?.time[1].date,
          time: searchRidesData?.time[1].time,
        };
        params = {...data, recurringDate, days: searchRidesData?.days};
      }
      console.log('params for search are', params);
      dispatch(searchRide(params, cancelToken.token, () => {
        dispatch(clearTime());
          navigation.navigate(HOME.searchRides, {
            rideType: checked === 'selectiveDays' ? 1 : 2,
          });
        }),
      );
    } catch (error) {
      DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select valid details');
    }
  };
  const swapLocations = () => {
    let newDestination = searchRidesData?.fromLatLong;
    let newSourceLocation = searchRidesData?.dropLatLong;
    dispatch(saveFromLatLong(newSourceLocation));
    dispatch(saveToLatLong(newDestination));
  };

  const checkRideType = rideType => {
    if (checked != rideType) {
      if (
        searchRidesData?.hasOwnProperty('date') ||
        searchRidesData?.hasOwnProperty('time')
      ) {
        toggleOverlay();
      } else {
        setChecked(rideType);
      }
    }
  };

  const deleteDateTime = () => {
    delete searchRidesData['date'];
    delete searchRidesData['time'];
    delete searchRidesData['days'];

    setChecked(checked === 'recurring' ? 'selectiveDays' : 'recurring');
  };

  const handleTimeVisible = () => {
    if (searchRidesData?.date != undefined) {
      setIsVisible(true);
    } else {
      DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please select dates first',);
    }
  };

  const timevalue =
    searchRidesData?.time && checked === 'selectiveDays' ? (
      searchRidesData?.time.map((item, index) => (
        <Text key={index}>
          {item.time} {searchRidesData?.time.length - 1 !== index ? '|' : null}
        </Text>
      ))
    ) : searchRidesData?.time && checked === 'recurring' ? (
      <Text>{searchRidesData?.time[0]?.time}</Text>
    ) : (
      strings.home.time
    );

    const toggleSelectRideType=(rideType)=>{
      checkRideType(rideType)
      dispatch(saveRideType(rideType))
    }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <Image source={Images.dashboardCoverImage} style={[StyleSheet.absoluteFill, styles.imageBackground]} />
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>{strings.home.heading}</Text>
            </View>
            <View>
              <View style={styles.filterView}>
                <View style={styles.checkboxView}>
              
                  <TouchableOpacity style={styles.checkboxText} onPress={() =>toggleSelectRideType('selectiveDays') }>
                    <RadioButton.Android value="selectiveDays" status={checked === 'selectiveDays' ? 'checked' : 'unchecked'} color="#8913D1" onPress={() =>toggleSelectRideType('selectiveDays')}/>
                    <Text style={{ color: checked == 'selectiveDays' ? '#000' : 'gray', fontFamily: Fonts.Lato400, fontSize: hp('1.9%')}}> {strings.home.selectiveDays}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.checkboxText} onPress={() => toggleSelectRideType('recurring')}>
                    <RadioButton.Android value="recurring" status={checked === 'recurring' ? 'checked' : 'unchecked'} color="#8913D1" onPress={()=>toggleSelectRideType('recurring')}/>
                    <Text style={{ color: checked == 'recurring' ? '#000' : 'gray', fontFamily: Fonts.Lato400, fontSize: hp('1.9%')}}>{strings.home.recurring}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: '2%'}}>
                  <Button onPress={() => navigation.navigate(HOME.pickLocation, {key: 'pickUp'}) }
                    mainViewStyle={[styles.searchButton, {width: '100%'}]}
                    text={searchRidesData?.fromLatLong?.address ? searchRidesData?.fromLatLong?.address : strings.home.from}
                    textStyle={searchRidesData?.fromLatLong?.address
                        ? [{ color: '#000'}, styles.btnText]
                        : [{ color: '#64748B89'}, styles.btnText]
                    }
                    leftIcon={ <Image source={Images.EllipseHome} style={{top: '25%'}} resizeMode="cover"/>}
                    leftIconEnable={true}
                    rightIconEnable={true}
                    rightIcon={
                      <TouchableOpacity onPress={() => swapLocations()}>
                        <Image source={Images.swapLocations} />
                      </TouchableOpacity>
                    }
                    rightIconViewStyle={styles.rightIcon}
                    leftText={true}
                    fontFamily={Fonts.Lato400}
                  />
                  <Image
                    source={Images.DashedLineHome}
                    style={{position: 'absolute', left: '4.5%', top: '24%'}}
                  />

                  <Button
                    onPress={() =>
                      navigation.navigate(HOME.pickLocation, {
                        key: 'destination',
                      })
                    }
                    mainViewStyle={[styles.searchButton, {width: '100%'}]}
                    text={
                      searchRidesData?.dropLatLong?.address
                        ? searchRidesData?.dropLatLong?.address
                        : strings.home.destination
                    }
                    textStyle={
                      searchRidesData?.dropLatLong?.address
                        ?[ {color: '#000'}, styles.btnText]
                        : [{color: '#64748B89'}, styles.btnText]
                    }
                    leftIcon={
                      <Image source={Images.EllipseHome} style={{top: '25%'}} resizeMode="cover"/>
                    }
                    leftIconEnable={true}
                    leftText={true}
                    fontFamily={Fonts.Lato400}
                  />
                  <Button
                    onPress={() =>
                      navigation.navigate(HOME.pickDate, {type: checked})
                    }
                    mainViewStyle={[styles.searchButton, {width: '100%'}]}
                    text={
                      searchRidesData?.date && checked === 'selectiveDays' ? (
                        searchRidesData?.date.map((item, index) => (
                          <Text key={index}>
                            {dateHelper(item)}{' '}
                            {searchRidesData?.date.length - 1 !== index
                              ? '|'
                              : null}
                          </Text>
                        ))
                      ) : searchRidesData?.date && checked === 'recurring' ? (
                        <Text>
                          {dateHelper(searchRidesData?.date[0])
                            }{' '}
                          -{' '}
                          {dateHelper(
                            searchRidesData?.date[
                              searchRidesData?.date.length - 1
                            ],
                          )}
                        </Text>
                      ) : (
                        strings.home.date
                      )
                    }
                    textStyle={searchRidesData?.date ?[ {color: '#000'}, styles.btnText] : [{color: '#64748B89'}, styles.btnText]}
                    rightIconEnable={true}
                    rightIcon={<Image source={Images.Calendar} style={{tintColor:'#64748B45'}}/>}
                    rightIconViewStyle={styles.rightIcon}
                    leftText={true}
                    fontFamily={Fonts.Lato400}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => handleTimeVisible()}
                    mainViewStyle={[styles.searchButton, {width: '49%'}]}
                    text={timevalue}
                    textStyle={
                      searchRidesData?.time
                        ? {
                            color: '#000',
                            width: '74%',
                            fontFamily: Fonts.Lato400,
                            fontSize:16
                          }
                        : {
                            color: '#64748B89',
                            width: '70%',
                            fontFamily: Fonts.Lato400,
                            fontSize:16
                          }
                    }
                    rightIconEnable={true}
                    rightIcon={<Image source={Images.Clock} style={{tintColor:'#000000'}}/>
                    }
                    leftText={true}
                    rightIconViewStyle={styles.rightIcon}
                    fontFamily={Fonts.Lato400}
                  />
                  <View style={{width: '2%'}} />
                  <Button
                    onPress={() => setSeatsVisible(!seatsVisible)}
                    mainViewStyle={[styles.searchButton, {width: '49%'}]}
                    text={seats}
                    textStyle={{
                      color: '#000',
                      width: '74%',
                      fontFamily: Fonts.Lato400,
                    }}
                    rightIconEnable={true}
                    rightIcon={
                      <Image source={Images.person} style={{tintColor:'#000000'}}/>
                    } 
                    leftText={true}
                    placeholder={strings.home.person}
                    placeholderTextColor="#64748B89"
                    rightIconViewStyle={styles.rightIcon}
                    fontFamily={Fonts.Lato400}
                  />
                </View>
                <Button onPress={() => handleSearchApi()} textStyle={styles.searchBtnText} text={strings.home.search} mainViewStyle={styles.searchButtonBlue} disabled={isLoading} Loading={isLoading}/>
              </View>
            </View>
          </View>

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayStyle}>
           <View style={{backgroundColor:'#fff', borderTopEndRadius:10, borderTopStartRadius:10}}>
              <Entypo name='cross' color='#000000' style={{alignSelf:'flex-end', marginEnd:10, marginTop:10}} size={25} onPress={()=>toggleOverlay()}/>
            <Image source={Images.wipeDate} style={{alignSelf:'center', marginBottom:'5%'}}/>
           <Text style={styles.wipeText}> Date and time data will be wiped out!</Text>
            <TouchableOpacity onPress={() => toggleOverlay() || deleteDateTime()} style={styles.overlayBtn}>
              <Text style={styles.overlayBtnText}>Wipe</Text>
            </TouchableOpacity>
           </View>
          </Overlay>
        </ScrollView>
        <TimePicker isVisible={isVisible} checked={checked} setIsVisible={setIsVisible} rideType={checked}/>
        <SeatPicker isVisible={seatsVisible} seats={seats} setSeats={setSeats} setIsVisible={setSeatsVisible}/>
      </SafeAreaView>
    </>
  );
};
