import { Text,View,ScrollView, TouchableOpacity, Image, FlatList, Alert, Share, TouchableOpacityBase } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { Rating } from "react-native-rating-element";
import {Divider} from "../Divider/Divider";
import { styles } from "./MyRideDetails.Styles";
import {Button} from "../Button/Button";
import { Images } from "../../assets/assets.path";
import { strings } from "../../Localization/Localization";
import moment from "moment";
import { Fonts } from "../../theme/Fonts";
import { TimeZone, weekArray } from "../../constants/Values.Constants";
import { dateHelper } from "../../utils/timeZoneHelper";
import dynamicLinks, { firebase } from '@react-native-firebase/dynamic-links';


export const RatingModal =(props)=>{

    const { setRatingModal,ratingData,onFinishRating,isLoading,handleDone} =props || ''

    return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10}}>
              <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setRatingModal(false)} />
              <Text style={styles.cancelRideHeading}>Rate Your Passengers</Text>
              <Text style={{alignSelf:'center', textAlign:'center', width:'80%', marginVertical:'2%'}}> Based upon your passenger's behaviour please provide the ratings.</Text>
              {ratingData?.length > 0 && ratingData?.map((item, index) => {
                return (
                  <View key={index} style={{ width: '90%', alignSelf: 'center', marginTop:'4%' }}>
                    <Text style={styles.nameText}>{item?.fullname}</Text>
                    <View style={{ marginVertical: '5%' }}>
                      <Rating count={5} marginBetweenRatingIcon={10}  size={40} rated={parseInt(item?.passengerRating)} onIconTap={position => onFinishRating(position, item?.passengerID)} type="custom" onFinishRating={(e) => onFinishRating(e, item?._id)} selectedIconImage={Images.star} emptyIconImage={Images.starUnfilled} />
                    </View>
                    <Divider mainViewStyle={{ backgroundColor: '#00000010', height: '1%', width: '100%', alignSelf: 'center', bottom: '5%' }} />
                  </View>
                )
              })}

              <Button onPress={() => handleDone()} mainViewStyle={{ bottom: 15 }} text={strings.passwordChangeDone.done} textStyle={styles.buttonText} Loading={isLoading} disabled={isLoading} />
            </View>
   )
}

export const DeleteModal =(props)=>{

    const {setDeleteModal,data,isDeleteLoading, deleteTodayRide,handleDeleteRide, deleteLoading } = props || ''

    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
              <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setDeleteModal(false)} />
              <Text style={styles.cancelRideHeading}>Are You Sure?</Text>
              {data?.rideType == 1 ? <Button mainViewStyle={{ width: "60%", margin: '1%', alignSelf: 'center', marginBottom: '8%',marginTop:"5%" }} text="Delete Ride" disabled={deleteLoading.today} Loading={isDeleteLoading} onPress={() => handleDeleteRide(new Date().toISOString().substring(0, 10) + ':00:00.000+00:00', 1, {today: true,upcoming: false,all: false})} />
                :
                <>
                  {deleteTodayRide && 
                  <Button mainViewStyle={{ width: "60%", margin: '1%', alignSelf: 'center',marginTop:'4%' }} text="Delete Today's ride" disabled={isDeleteLoading} Loading={deleteLoading.today} onPress={() => handleDeleteRide(new Date().toISOString().substring(0, 10) + ':00:00.000+00:00', 1, {today: true,upcoming: false,all: false})} />}
                  <Button mainViewStyle={{ width: "60%", margin: '4%', alignSelf: 'center' }} text="Delete Upcoming Rides" disabled={isDeleteLoading} Loading={deleteLoading.upcoming} onPress={() => handleDeleteRide(new Date().toISOString().substring(0, 10) + ':00:00.000+00:00', 2,{today: false,upcoming: true,all: false})} />
                  <Button mainViewStyle={{ width: "60%", alignSelf: 'center', marginBottom: '8%', backgroundColor: '#b12' }} text="Delete All Rides" disabled={isDeleteLoading} Loading={deleteLoading.all} onPress={() => handleDeleteRide(null, 3,{today: false,upcoming: false,all: true})} textStyle={{ color: '#fff' }} />
                </>
              }
            </View>
    )
}

export const CancelBookingModal = props=>{

    const {setCancelModal, data, isCancelLoading, handleCancelRide, deleteTodayRide} = props || ''

    return(
       <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
            <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setCancelModal(false)} />
              <Text style={styles.cancelRideHeading}>Are You Sure?</Text>
              {data?.rideType == 1 ? <Button mainViewStyle={{ width: "60%", margin: '1%', alignSelf: 'center',  marginBottom: '8%',marginTop:"5%"  }} text="Cancel Ride" disabled={isCancelLoading} Loading={isCancelLoading} onPress={() => handleCancelRide(null)} />
                :
                <>
                  {deleteTodayRide && <Button mainViewStyle={{ width: "60%", margin: '1%', alignSelf: 'center', marginBottom: '2%' }} text="Cancel Today's ride" disabled={isCancelLoading} Loading={isCancelLoading} onPress={() => handleCancelRide(new Date().toISOString().substring(0, 10) + ':00:00.000+00:00')} />}
                  <Button mainViewStyle={{ width: "60%", margin: '4%', alignSelf: 'center', marginBottom: '10%' }} text="Cancel Upcoming Rides" disabled={isCancelLoading} Loading={isCancelLoading} onPress={() => handleCancelRide(null)} />
                </>
              }
    </View> 
    )
} 

export const RateBooking = props=>{

    const {rating, ratingCompleted, handleRatingRide, isPassengerRatingLoading, setVisible, isStartRideLoading} =props || ''

    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
            <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setVisible(false)} />
            <Text style={[styles.cancelRideHeading]}>Rate Your Ride</Text>
              <View style={{ alignSelf: 'center', marginVertical: 15 }}>
                <Rating count={5} marginBetweenRatingIcon={10} size={40} rated={rating} onIconTap={position => ratingCompleted(position)} type="custom" selectedIconImage={Images.star} emptyIconImage={Images.starUnfilled} />
              </View>
            <Button mainViewStyle={{ width: '80%', alignSelf: 'center', marginBottom: '5%', backgroundColor: '#00F9FF' }} text="Done" onPress={() => handleRatingRide()} Loading={isPassengerRatingLoading} disabled={isPassengerRatingLoading} isStartRideLoading={isStartRideLoading}/>
        </View> 
    )
}

export const PassengerDetails=(props)=>{

  const scrollData = props.scrollData||[]

  const renderItem =(item)=>{

    const MapWeekDays = (days) => {
      return (
        <View style={{ flexDirection: 'row', marginTop: '4%', width: '100%' }}>
          {weekArray.map((ele, index) => (
            <View style={{ width: '10%', marginRight: "5%", height: 50 }} key={index}>
              <View style={{ minWidth: 29, minHeight: 29,alignItems:'center', justifyContent:'center', backgroundColor: days?.includes(index) ? '#00F9FF' : '#00000040', borderRadius: 100 }}>
                <Text style={styles.weekdays}> {ele}</Text>
              </View>
            </View>
          ))}
        </View>)
  
    }

  const renderDate =()=>{
    if (item?.selectiveDate){
      return (<Text style={{color:'#00000080', fontFamily:Fonts.Lato400, fontSize:14, marginTop:5}}>{dateHelper(item?.selectiveDate)}</Text>)
    }
    else  return(
    <View>
      <Text style={{color:'#00000080', fontFamily:Fonts.Lato400, fontSize:14, marginTop:5}}>{dateHelper(item?.recurringStartDate)} - {dateHelper(item?.recurringEndDate)} </Text>
      {MapWeekDays(item?.recurringWeekDays)}
    </View>)
  }

    return (
   <View style={{borderWidth:0.5, borderColor:'#00000020', borderRadius:10, flexDirection:'column', padding:10, marginRight:10, width:280, marginBottom:10}}>
       <View style={{flexDirection:'row'}}>
         <Image source={item?.userDetail?.profileImage ? {uri:item?.userDetail?.profileImage}: Images.profilePic} style={{width:50, height:50,marginRight:10, borderRadius:100}}/>
         <View style={{flexDirection:'column'}}>
            <Text style={styles.nameText} numberOfLines={1}>{item?.userDetail?.fullname?.length<20 ?item?.userDetail?.fullname:item?.userDetail?.fullname?.substring(0,18)+'...'}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={Images.SeatsCount}/>
            <Text style={{color:"#5B3FCC", fontSize:15, fontFamily:Fonts.Lato700}}>{item?.seatBooked} Seats</Text>
          </View>
          <View>
         </View>
         </View>
      </View>
      <Text style={{color:'#000', fontFamily:Fonts.Lato700, fontSize:15, marginTop:10}}>Date & Time</Text>
      {renderDate()}
   </View>
    )
  }

  const ListEmptyComponent =()=>(
    <View style={{width:"100%", height:'100%', backgroundColor:'#fff'}}>
        <Text style={styles.listEmptyText}>{strings.rideListing.noBooking}</Text>
    </View>
  )

  return (

  <View>
    <Text style={[styles.dateTimeHeading, { marginTop: '10%' , marginBottom:'5%'}]}>Passengers Details</Text>
      <FlatList data={scrollData} keyExtractor={(item, index) => index} renderItem={({item})=>renderItem(item)} horizontal ListEmptyComponent={()=><ListEmptyComponent/>}/>
  </View>
  )
}

export const StartEndRideModal = (props) => {

  const {setStartEndRideModal, startEndRideModal, handleStartEndRide} = props || {};  

  const handleOnPress = () =>{
    handleStartEndRide()
    setStartEndRideModal({visible:false})
  }

  return(
    <View style={{backgroundColor:"#fff", borderTopLeftRadius:10,borderTopRightRadius:10, alignItems:'center' }}>
       <Entypo name='cross' style={{ color: '#000', alignSelf: 'flex-end' }} size={24} onPress={() => setStartEndRideModal({visible:false, text:startEndRideModal.text})} />
        <Image source={Images.SureIcon}/>
      <Text style={{color:"#000000",fontFamily:Fonts.Lato700,fontSize:20, width:'50%',textAlign:'center', marginVertical:15}} >Are you sure you want to {startEndRideModal.text} the ride?</Text>
      <Button text='Confirm' textStyle={styles.BtnText} mainViewStyle={{width:'80%'}} onPress={()=>handleOnPress()}/>
      <Button text='Cancel' mainViewStyle={{backgroundColor:'#fff', marginBottom:'5%'}} onPress={()=>setStartEndRideModal({visible:false})}/>
    </View>
  )
}

export const RidesFooter = props=>{

  const {data , keyValue, rideStatus, toggleOverlay, setCancelModal, setDeleteModal, handleEditRide, isStartRideLoading, rideStatusLoading, toggleStartEndRide, handleTrack} = props||''
 
  console.log(data?.rideBookStatus)
  return (<>
    {keyValue === 'myBookings' ? (
          <View>
            {data?.rideBookStatus == 'completed' && data?.rideRatingStatus == false ?
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginBottom:5 }} onPress={toggleOverlay}>
                <Text style={[styles.dateTimeHeading, { width: '80%', marginStart: '5%' }]}>Rate This Ride</Text>
                <Image source={Images.rigntArrow} style={{ tintColor: '#000' }} />
              </TouchableOpacity> : 
              data?.rideBookStatus == 'completed' && data?.rideRatingStatus == true ?
               <View style={{width:'100%', justifyContent:'center'}}>
                <Text style={styles.rideCompleted}>Completed</Text>
               </View>:
              data?.rideBookStatus == 'cancelled' ?
                <View style={[styles.buttonContainer, { alignSelf: 'center' }]}>
                  <Text style={styles.cancelBookingText}>You cancelled this ride</Text>
                </View> :
                <View style={styles.myBookingContainer}>
               {data?.rideBookStatus === 'ongoing'&&
               <Button mainViewStyle={[styles.buttonContainer, { backgroundColor: '#00F9FF', width:'80%', marginTop:10 }]} text='Track Now' textStyle={[{ color: '#26185F' }, styles.BtnText]} onPress={()=> handleTrack('Booking')}/>}
                <TouchableOpacity style={styles.buttonContainer} onPress={() => setCancelModal(true)}>
                  <Text style={styles.cancelBookingText}>Cancel Booking</Text>
                </TouchableOpacity>
                </View>
                }
          </View>
        ) : (
          <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#00000030', height: '10%', alignSelf: 'center', width: '95%', justifyContent:'center' }}>
           {rideStatus == 'ongoing'?
           <TouchableOpacity style={[styles.editDeleteBtnContainer, { alignContent:'center', marginRight:'20%'}]} onPress={()=> handleTrack('Publish')}>
           <Image source={Images.Map} style={{ alignSelf: 'center'}} resizeMode="cover"/>
         </TouchableOpacity>
           :
            <>
            <TouchableOpacity style={rideStatus == 'ongoing' ? [styles.editDeleteBtnContainer, { backgroundColor: '#00000030' }] : styles.editDeleteBtnContainer} onPress={() => setDeleteModal(true)} disabled={rideStatus == 'ongoing'}>
               <Image source={Images.Delete} style={{ alignSelf: 'center' }} resizeMode="contain" />
             </TouchableOpacity>
             <TouchableOpacity style={rideStatus == 'ongoing' || rideStatus == 'completed' ? [styles.editDeleteBtnContainer, { backgroundColor: '#00000030' }] : styles.editDeleteBtnContainer} onPress={() => handleEditRide()} disabled={rideStatus == 'ongoing' || rideStatus == 'completed'}>
               <Image source={Images.Edit} style={{ alignSelf: 'center' }} />
             </TouchableOpacity></>}
            <Button mainViewStyle={rideStatus==='completed' && data?.driverRideRatingStatus == true ? [styles.buttonContainer, { backgroundColor: '#17A50080', width: '50%' }]:[styles.buttonContainer, { backgroundColor: '#00F9FF', width: '50%' }]} text={rideStatus === 'upcoming' || rideStatus === 'pending' ? 'Start The Ride' : rideStatus === 'ongoing' ? 'End Ride' :rideStatus==='completed' && data?.driverRideRatingStatus == true ?'Completed': 'Rate This Ride'} onPress={() => toggleStartEndRide()} textStyle={[{ color: '#26185F' }, styles.BtnText]} Loading={isStartRideLoading || rideStatusLoading} disabled={isStartRideLoading || data?.driverRideRatingStatus == true || rideStatusLoading} />
          </View>
        )} 
        </>)
    
}

const shareRideDetails = async (id, date)=>{
  let params = {rideId:id,date:date}
  console.log({params})
  const dynamicLinkParameters = {
    link: 'https://letsridekids.com/',
    domainUriPrefix: 'https://lrk.page.link',
    analytics:{
      campaign:'5',
      content: JSON.stringify(params),
      medium: JSON.stringify(params),
    },
    android: {
      packageName: "com.lrk.letsridekids",
      fallbackUrl: "https://play.google.com/store/apps/details?id=com.lrk.letsridekids",
             }, 
    ios: {
      bundleId: 'com.lrk.letsridekids',
      appStoreId: "6444216910",
      fallbackUrl: "https://apps.apple.com/in/app/blindly-dating/id6444216910",
    },
    
    
  };

  try {
    const dynamicLink = await firebase.dynamicLinks().buildShortLink(dynamicLinkParameters, firebase.dynamicLinks.ShortLinkType.SHORT);
    console.log('Dynamic link URL:', dynamicLink);
    const result = await Share.share({
          message:
           `Hi, I am using LetsRideKids app to easily plan carpools for our kids. Please join my carpool on LetsRideKids. ${dynamicLink}`
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
  } catch (error) {
    console.log('Error creating dynamic link:', error);
  }
}

export const ShareButton =({id, date})=>{
  return (
    <TouchableOpacity style={{backgroundColor:'#EFF1F3',marginTop:'5%', borderRadius:20, flexDirection:'row', justifyContent:'space-between',alignItems:'center', paddingHorizontal:'4%', height:'50%'}} onPress={() => shareRideDetails(id, date)}>
      <Image source={Images.ShareIcon} style={{marginRight:'2%'}} />
      <Text style={{fontFamily:Fonts.Lato700,color:'#26185F', fontSize:16}}>{strings.rideDetails.share}</Text>
    </TouchableOpacity>
  )
}
export const ShareRide =({id, date})=>{
  return (
   
    <Button 
      mainViewStyle={{backgroundColor:'#00F9FF30',marginVertical:'5%', width:'100%', alignSelf:'center'}}
      text={strings.rideDetails.shareRide}
      textStyle={{fontFamily:Fonts.Lato700,color:'#26185F'}}
      rightIcon={
      <Image
        source={Images.rigntArrow}
        style={{tintColor: '#000', left: 5}}
      />
    }
    rightIconEnable={true}
    rightIconViewStyle={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginEnd:'4%'}}
    leftIconEnable
    leftIcon={
    <Image
      source={Images.ShareIcon}
      style={{marginLeft:15}}/>}
    onPress={() => shareRideDetails(id, date)}
    />
  )
}
