import { FlatList, Text, View, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRides } from '../../../redux/selectors/Rides.Selectors'
import { Images } from '../../../assets/assets.path'
import {styles} from './MyBookedRides.Styles'
import { getBookedRides } from '../../../redux/actions/Rides.Actions'
import moment from 'moment'
import { RIDES } from '../../../constants/Navigation.Constants'
import { strings } from '../../../Localization/Localization'
import { TimeZone, weekArray } from '../../../constants/Values.Constants'
import { dateHelper, timeHelper } from '../../../utils/timeZoneHelper'
import { ShareRide } from '../../../components'
import { ShareButton } from '../../../components/MyRideDetails/MyRideDetails'

const MyBookedRides = ({navigation}) => {

    const rideData = useSelector(getRides)
    const [myBookedRides, setMyBookedRides] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch()

    useEffect(()=>{
        setMyBookedRides(rideData?.bookedRides ? rideData?.bookedRides: [])
    }, [rideData])

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
        const { publihserDetail, rideBookStatus } =item;
        console.log({rideBookStatus})
          return(
             <TouchableOpacity style={styles.rideDetailsCard} key={index} onPress={()=>{
              navigation.navigate(RIDES.myRideDetails, {data:item, key:'myBookings', vehicleDetails:publihserDetail?.VehicleDetails})}} >
        
             <View style={{flexDirection: 'row'}}>
               <View style={{width: '15%', margin: 5}}>
                 <Image source={publihserDetail?.profileImage  ?  {uri :publihserDetail?.profileImage } : Images.profilePic} style={{marginStart: 10, marginTop: 10, height:45, width:45, borderRadius:100}} resizeMode="cover"/>
               </View>
        
               <View style={{flexDirection: 'row', width: '55%'}}>
                 <View style={{alignSelf: 'center'}}>
                   <View style={{flexDirection: 'row'}}>
                     <Text style={styles.nameText} numberOfLines={1}>{publihserDetail?.fullname??publihserDetail?.email?.mail}</Text>
                     <Image source={publihserDetail?.govtId?.isVerified == true? Images.verified: null} style={{marginStart: '2%', alignSelf: 'center'}}/>
                   </View>
                   <View style={{flexDirection: 'row', top: '4%'}}>
                     <Image source={Images.RatingStar} />
                     <Text style={styles.rating}>{publihserDetail?.userRating ? publihserDetail.userRating : '--'}</Text>

                     <View style={styles.rideTypeContainer}>
                       <Text style={styles.rideTypeText}>{item?.rideType === 1 ? 'One-Time Ride' : 'Recurring'}</Text>
                     </View>

                   </View>
                 </View>
               </View>
               <ShareButton date={item?.rideType==1?item?.rideDateDetails?.date:null} id={item?.rideDetailId}/>
              </View>
               <View style={[styles.locationContainer,{ marginTop: 20}]}>
                 {item?.rideType ==1 ? <><Text key={index} style={styles.dateTimeText}>{dateHelper(item?.rideDateDetails?.date)} - {timeHelper(item?.selectiveDate[0]?.utcTime)}</Text></>:<Text style={styles.dateTimeText}>{dateHelper(item?.recurringStartDate)} - {dateHelper(item?.recurringEndDate)} | {timeHelper(item?.recurringDate?.utcTime)} </Text>}
                 {item?.rideType ==2 && MapWeekDays(item?.days)}
               </View>
      
                <View style={[styles.locationContainer, {flexDirection:'row', marginTop: 10}]}>

                <View style={{width: '5%', marginTop: '2%', marginStart: '2%'}}>
                   <Image source={Images.Ellipse} resizeMode="cover" />
                   <Image
                     source={Images.Line}
                     style={{left: '20%'}}
                     resizeMode="cover"
                   />
                   <Image source={Images.Ellipse} resizeMode="cover" />
                 </View>

                   <View style={{width:'50%'}}>
                   <View style={{flexDirection:'row', marginBottom:'6%'}}>
                      <Text style={styles.fromText} numberOfLines={1}>{item?.fromlocation?.fromAddress}</Text>
                  </View>
        
                  <View style={{flexDirection:'row', marginBottom:'10%', marginTop:'4%'}}>
                      <Text style={styles.fromText} numberOfLines={1}>{item?.tolocation?.toAddress}</Text>
                  </View>
                   </View>

                   <View style={styles.rideStatusContainer}>
                     <View style={[styles.rideStatusCard, { backgroundColor: rideBookStatus === 'upcoming' || rideBookStatus === 'pending' ? '#FFF5E1' : rideBookStatus === 'ongoing' ? '#00FFFF' : rideBookStatus === 'cancelled' ? '#b1200030' : '#E5FFE1' }]}>
                         <Text style={[styles.rideStatusText, {color: rideBookStatus === 'upcoming' || rideBookStatus === 'pending' ? '#BF9709' : rideBookStatus === 'ongoing' ? 'blue' : rideBookStatus === 'cancelled' ? '#b12' : '#17A500' }]}>{rideBookStatus === 'upcoming' ? "Upcoming" : rideBookStatus === 'pending' ? "Pending" : rideBookStatus === 'ongoing' ? 'On going' : rideBookStatus === 'cancelled' ? 'Cancelled' : 'Completed'}</Text>
                     </View>
                   </View>
                  
                </View>
              </TouchableOpacity>
            )
          }
    
    const onRefresh =()=>{
        setRefreshing(true)
        dispatch(getBookedRides())
        setRefreshing(false)
    }

    const ListEmptyComponent =()=>(
      <View style={{width:"100%", height:'100%', backgroundColor:'#fff'}}>
          <Image source={Images.noRidesAvailable} style={styles.listEmptyImg} resizeMode='cover'/>
          <Text style={styles.listEmptyText}>{strings.rideListing.noRidesBooked}</Text>
      </View>
    )
          
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <FlatList data={myBookedRides} renderItem={({index, item})=>listingElement({index, item})} keyExtractor={item => item._bookingId}  showsVerticalScrollIndicator={false} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} ListEmptyComponent={()=><ListEmptyComponent/>}/>
    </View>
  )
}

export default MyBookedRides

