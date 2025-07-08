import { Text, View, StatusBar, Image, TouchableOpacity, SectionList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './RideListing.Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {HOME, TABS} from '../../constants/Navigation.Constants';
import {Header,Button,fetchDistanceBetweenPoints} from '../../components';
import {strings} from '../../Localization/Localization';
import {useSelector} from 'react-redux';
import {getSearchRidesData} from '../../redux/selectors/SearchRides.Selectors';
import {getPreciseDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import {AirbnbRating, Overlay} from '@rneui/base';
import { Rating } from 'react-native-rating-element';
import Entypo from 'react-native-vector-icons/Entypo'
import {RadioButton} from 'react-native-paper';import moment from 'moment';
import { timeHelper } from '../../utils/timeZoneHelper';
import { ShareButton } from '../../components/MyRideDetails/MyRideDetails';
;

export const RideListing = ({navigation, route}) => {
  const {rideType} = route.params || '';

  const searchRideList = useSelector(getSearchRidesData);

const [rideListing, setRideListing] = useState([]);
const [sortView, setSortView] = useState(false)
const [checked, setChecked] = useState('near')
const [loading, setLoading] = useState(false)

  useEffect(() => {
    setRideListing( searchRideList?.searchRideData?.availableRides ? searchRideList?.searchRideData?.availableRides : [])
    handleSort()
  }, [ searchRideList?.searchRideData?.availableRides]);

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);


  const handleSort = ()=>{

    setLoading(true)
    let data = [...rideListing]
  
    function compare (dist1, dist2 ){
      if (calculateDistance(dist1?.fromlocation?.coordinates)<calculateDistance(dist2?.fromlocation?.coordinates)){
        
        return checked=='near' ? -1: 1
      }
      if (calculateDistance(dist2?.fromlocation?.coordinates)<calculateDistance(dist1?.fromlocation?.coordinates)){
        return checked!='near' ? -1: 1
      }
    }
    setRideListing((data)=> {return data.sort(compare)})
    setLoading(false)
    setSortView(false)
  }
  

  const calculateDistance = coordinates => {
    var dis = getPreciseDistance(
      {latitude: position?.latitude, longitude: position?.longitude},
      {latitude: coordinates[1], longitude: coordinates[0]},
    );
    return (parseFloat(dis / 1609.344).toFixed(2))
  };


  const listingElement = ({item, index}) => {
    const { ridePublishDetails, userDetail, fromlocation, tolocation, rideDatesDetails} = item;
    const [ETAData, setETAData] = useState('');

    useEffect(() => {
      ETA(fromlocation?.coordinates, tolocation?.coordinates);
    }, []);
    
    const ETA = async (latLong1, latLong2) => {
      let data = await fetchDistanceBetweenPoints(latLong1, latLong2);
      setETAData(data);

    };
    return (
      <TouchableOpacity style={styles.rideDetailsCard} onPress={() => navigation.navigate(HOME.rideDetails, { data: item, currentLocation: {position} }) } key={index}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '15%', margin: 5}}>
            <Image source={ userDetail.profileImage ? {uri: userDetail.profileImage} : Images.profilePic } style={{ marginStart: 10, marginTop: 10, height: 45, width: 45, borderRadius: 100}} resizeMode="cover"/>
          </View>

          <View style={{flexDirection: 'row', width: '50%'}}>
            <View style={{alignSelf: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nameText} numberOfLines={1}>{userDetail.fullname ?? userDetail?.email?.mail }</Text>
                <Image source={userDetail?.govtId?.isVerified == true ? Images.verified : null} style={{marginStart: '2%', alignSelf: 'center'}}/>
              </View>
              <View style={{flexDirection: 'row', top: '4%'}}>
                <Image source={Images.RatingStar} />
                <Text style={styles.rating}>{userDetail.userRating ? userDetail.userRating : '--'}</Text>

                <View style={styles.rideTypeContainer}>
                  <Text style={styles.rideTypeText}>
                    {ridePublishDetails?.rideType === 1 ? 'One-Time Ride' : 'Recurring'}
                  </Text>
                </View>
                
              </View>
            </View>
          </View>
          <ShareButton id={typeof (item?._id) === 'object' ? item?._id?.publisherId : item?._id} date={item?.rideDatesDetails?.date??null}/>
        </View>

        <View style={[styles.locationContainer, {flexDirection: 'row'}]}>
          <View style={{width: '5%', marginTop: '2%', marginStart: '2%'}}>
            <Image source={Images.Ellipse} resizeMode="cover" />
            <Image source={Images.LineExtended} style={{left: '20%'}} resizeMode="cover"/>
            <Image source={Images.Ellipse} resizeMode="cover" />
          </View>

          <View style={{width: '95%'}}>
              <View style={{flexDirection: 'column', width: '100%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.fromText} numberOfLines={1}> {ridePublishDetails?.fromAddress}</Text>
                  <Text style={styles.fromText}> | {timeHelper(rideDatesDetails?.utcTime)}
                  </Text> 
                </View>
                <Text style={styles.distanceText}>{calculateDistance(ridePublishDetails?.fromlocation?.coordinates)} miles from your location</Text>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: '4%', marginTop: '8%'}}>
              <View style={{flexDirection: 'column', width: '100%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.fromText} numberOfLines={1}>{ridePublishDetails?.toAddress}
                  </Text>{ETAData ? <Text style={styles.fromText}>| {ETAData}</Text> : null}
                </View>
                <Text style={styles.distanceText}>{calculateDistance(ridePublishDetails?.tolocation?.coordinates)} miles from your location</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.passengerText}>{rideDatesDetails?.availableSeatcount} {strings.rideDetails.availableSeats}</Text>
          <Rating readonly  marginBetweenRatingIcon={3} rated={rideDatesDetails?.seatCount - rideDatesDetails?.availableSeatcount} totalCount={rideDatesDetails?.seatCount} size={25} direction="row-reverse" type="custom" selectedIconImage={Images.SeatsBooked} emptyIconImage={Images.SeatsFree}/>
        </View>
      </TouchableOpacity>
    );
  };


  const ListEmptyComponent = () => (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <Image source={Images.noRidesAvailable} style={styles.listEmptyImg} resizeMode="cover"/>
      <Text style={styles.listEmptyText}> {strings.rideListing.noRidesAvailable}</Text>
      <Button text={strings.rideListing.tryAgain} mainViewStyle={styles.listEmptyBtn} textStyle={styles.listEmptyBtnText} onPress={() => navigation.navigate(TABS.home)}/>
    </View>
  );

  const getRideListingData = rideListingData => {
    let otherRideType = searchRideList?.rideType === 'selectiveDays' ? 2 : 1;

    if (rideListingData?.length > 0) {
      let filterSameRideType = [
        {
          title: '',
          data: rideListingData?.filter(item => item.ridePublishDetails.rideType === rideType).map(item => {return item})
        }
      ]
      let filterDiffRideType = rideListingData?.filter(item => item.ridePublishDetails.rideType === otherRideType).map(item => {return item})

      if (filterDiffRideType.length > 0) {filterSameRideType.push({title: strings.rideListing.otherAvailableRides, data: filterDiffRideType})}

      return filterSameRideType
    } else {
      return []
    }
  }

  return (
    <>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />
      <SafeAreaView style={styles.SafeAreaView}>
          <Header
            left={
              <TouchableOpacity onPress={() => navigation.navigate(TABS.home)}>
                <Image source={Images.leftArrow} style={{tintColor: '#000000'}} resizeMode="cover"/>
              </TouchableOpacity>}
            leftViewStyle={{padding: 5}}
            center={<Text style={styles.availableRidesText}> {strings.rideListing.availableRides} </Text>}
            rightViewStyle={{padding: 5}}
            mainContainerStyle={styles.mainContainerStyle}
          />

        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <SectionList
            renderSectionHeader={({section: {title}}) => {
              return (
                title?  <View style={{flexDirection:'row', justifyContent:'center', width:'100%', alignItems:'center', marginVertical:10}}>
                <View style={{height:.2, backgroundColor:"#00000050",width:'40%', flexDirection:'row'}}/>
                <Image source={Images.footerCar}  style={{marginHorizontal:10, tintColor:'#00000080'}}/>
                <Text style={styles.otherRidesText}>{title}</Text>
                <View style={{height:.2, backgroundColor:"#00000050",width:'40%', flexDirection:'row'}}/>
              </View>
              :
              null
              );
            }}
            sections={getRideListingData(rideListing)}
            keyExtractor={(item, index) => index}
            renderItem={(data, index) => listingElement(data, index)}
            ListEmptyComponent={() => <ListEmptyComponent />}
            refreshing={loading}
          />

        {rideListing?.length >0 && <TouchableOpacity style={{alignSelf:"center", backgroundColor:'#00F9FF', width:'40%', borderRadius:10, position:'absolute', bottom:0}} onPress={()=>setSortView(!sortView)}>
          <View style={{alignSelf:'center', flexDirection:'row', padding:15}}>
          <Image source={Images.swapLocations} style={{marginRight:5, tintColor:'#26185F'}}/>
          <Text style={styles.SortText}>{strings.rideListing.Sort}</Text>
          </View>
        </TouchableOpacity>}

        </View>

        <Overlay supportedOrientations={['landscape', 'portrait']} overlayStyle={styles.bottomRating} isVisible={sortView}>
            <View style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding:10, justifyContent:'space-evenly'}}>
              <View style={{flexDirection:'row'}}>
              <Entypo color="#000000" size={25} name="cross" onPress={()=>setSortView(!sortView)}/>
              <Text style={[styles.SortText, {textAlign:'center', width:'80%'}]}>{strings.rideListing.Sort}</Text>
              <TouchableOpacity style={styles.overlayBtn} onPress={()=>handleSort()}>
                <Text style={styles.overlayBtnText}>Done</Text>
              </TouchableOpacity>
              </View>
              
            <TouchableOpacity onPress={()=>setChecked('near')} style={{width:'100%', justifyContent:"space-between", marginTop:'5%', flexDirection:'row'}}>
              <Text style={styles.sortDetailsText}>{strings.rideListing.nearest}</Text>
              <RadioButton.Android value="near" status={checked === 'near' ? 'checked' : 'unchecked'} color="#8913D1" onPress={()=>setChecked('near')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setChecked('far')} style={{width:'100%', justifyContent:"space-between", paddingBottom:10, flexDirection:'row', marginTop:'2%'}}>
              <Text style={styles.sortDetailsText}>{strings.rideListing.farthest}</Text>
              <RadioButton.Android value="far" status={checked === 'far' ? 'checked' : 'unchecked'} color="#8913D1" onPress={()=>setChecked('far')}/>
            </TouchableOpacity>

            </View>
          </Overlay>

      </SafeAreaView>
    </>
  );
};