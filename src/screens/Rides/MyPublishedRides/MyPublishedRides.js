import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRides } from '../../../redux/selectors/Rides.Selectors'
import { Images } from '../../../assets/assets.path'
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styles} from './MyPublishedRides.Styles'
import { getUser } from '../../../redux/selectors/User.Selectors'
import { getPublishedRides } from '../../../redux/actions/Rides.Actions'
import { RIDES } from '../../../constants/Navigation.Constants'
import { strings } from '../../../Localization/Localization'
import { TimeZone, weekArray } from '../../../constants/Values.Constants'
import { dateHelper, timeHelper } from '../../../utils/timeZoneHelper'
import { ShareButton } from '../../../components/MyRideDetails/MyRideDetails'

const MyPublishedRides = ({navigation}) => {


    const ridesData = useSelector(getRides)
    const user = useSelector(getUser)
    const [myPostedRides, setMyPostedRides] = useState([])
    const [refreshing, setRefreshing] = useState(false);
 
    useEffect(()=>{
    setMyPostedRides(ridesData?.publishedRides ? ridesData?.publishedRides :[])},
    [ridesData])

    const dispatch= useDispatch()
  
    const MapWeekDays=(days)=>{
      return (
        <View style={{flexDirection:'row', marginTop:'4%', width:'80%'}}>
          { weekArray.map((ele, index) => (
            <View style={{width:'10%', marginRight:"5%", height:50}}  key={index}>
              <View style={{ minWidth : 35,minHeight : 35,justifyContent :'center',alignItems :'center' , backgroundColor: days?.includes(index) ? '#00F9FF':'#00000040' , borderRadius : 100}}>
              <Text style={styles.weekdays}> {ele}</Text> 
            </View>
        </View>))}
        </View>)
      
    }
  
    const listingElement =({index, item})=>{

        const { userDetail } =item;


            return(
            <TouchableOpacity style={styles.rideDetailsCard}  onPress={()=>navigation.navigate(RIDES.myRideDetails, {data:item, key:'myPublished', vehicleDetails:item?.userDetail?.VehicleDetails})} key={index}>
        
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '15%', margin: 5}}>
                <Image source={userDetail?.profileImage  ?  {uri :userDetail?.profileImage } : Images.profilePic} style={{marginStart: 10, marginTop: 10, height:45, width:45, borderRadius:100}} resizeMode="cover"/>
              </View>
        
              <View style={{flexDirection: 'row', width: '55%'}}>
                <View style={{alignSelf: 'center'}}>
                  <View style={{flexDirection: 'row', width:'75%'}}>
                    <Text style={styles.nameText} numberOfLines={1}>{userDetail?.fullname ?? userDetail?.email?.mail}</Text>
                    <Image source={user?.govtId?.isVerified ==true ? Images.verified: null} style={{marginStart: '2%', alignSelf: 'center'}}/>
                  </View>
                  <View style={{flexDirection: 'row', top: '4%'}}>
                    <Image source={Images.RatingStar} />
                    <Text style={styles.rating}>{userDetail?.userRating ? userDetail.userRating : '--'}</Text>
                    
                    <View style={styles.rideTypeContainer}>
                      <Text style={styles.rideTypeText}>{item?.rideType === 1 ? 'One-Time Ride' : 'Recurring'}</Text>
                    </View>
                  
                  </View>
                </View>
              </View>
              <ShareButton date={item?.selectiveDate?.length>0?item?.selectiveDate[0]?.date:item?.recurringDate?.startDate} id={item?._id}/>      
            </View>
      
      
              <View style={[styles.locationContainer,{ marginTop: 20}]}>
                {item?.rideType ==1 ? <>{item?.selectiveDate.map((ele, index)=>(<Text key={index} style={styles.dateTimeText}>{dateHelper(ele?.date)} - {timeHelper(ele.utcTime)}</Text>))}</>:<Text style={styles.dateTimeText}>{dateHelper(item?.recurringDate?.startDate)} - {dateHelper(item?.recurringDate?.endDate)} | {timeHelper(item?.recurringDate?.utcTime)} </Text>}
                {item?.rideType ==2 && MapWeekDays(item?.days)}
              </View>
      
              <View style={[styles.locationContainer, {flexDirection:'row', marginTop: 10}]}>
                
                <View style={{width:'5%', marginTop:'2%', marginStart:'2%'}}>
                    <Image source={Images.Ellipse} resizeMode="cover"/>
                    <Image source={Images.Line} style={{left:'20%'}} resizeMode="cover"/>
                    <Image source={Images.Ellipse} resizeMode="cover"/>
                </View>
      
                <View style={{width:'95%'}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.fromText} numberOfLines={1}>{item?.fromlocation?.fromAddress}</Text>
                </View>
        
                  <View style={{flexDirection:'row', marginBottom:'6%', marginTop:'5%'}}>
                    <Text style={[styles.fromText, {width:parseInt(item?.seatCount - item?.availableSeats)>0?'70%':'80%'}]} numberOfLines={1}>{item?.tolocation?.toAddress}</Text>
                    {(parseInt(item?.seatCount - item?.availableSeats)>0) &&
                    <View style={styles.bookingStatusContainer}>
                        <Text style={styles.rideStatusText}>Booked</Text>
                    </View>}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            )
          }

          const onRefresh =()=>{
            setRefreshing(true)

            let params = {
                userId: user._id
              }

            dispatch(getPublishedRides(params))
            setRefreshing(false)
        }

        const ListEmptyComponent =()=>(
          <View style={{width:"100%", height:'100%', backgroundColor:'#fff'}}>
              <Image source={Images.noRidesAvailable} style={styles.listEmptyImg} resizeMode='cover'/>
              <Text style={styles.listEmptyText}>{strings.rideListing.noRidesPublished}</Text>
          </View>
        )

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
        <FlatList data={myPostedRides} renderItem={({index, item})=>listingElement({index, item})} keyExtractor={item => item._id} showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={()=><ListEmptyComponent/>}/>
    </View>
  )
}

export default MyPublishedRides

