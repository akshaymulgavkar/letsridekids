import React, {useState} from 'react';
import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {Fonts} from '../../theme/Fonts';
import {Button,Header} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import {HOME, PUBLISH_RIDES, TABS} from '../../constants/Navigation.Constants';
import {styles} from './AddStopOvers.Styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPostRidesData } from '../../redux/selectors/PostRides.Selectors';
import { saveStopOvers } from '../../redux/actions/PublishRides.Action';
import { DropDownHolder } from '../../utils/DropDownHolder';

export const AddStopOvers = ({navigation}) => {

  const publishRideData = useSelector(getPostRidesData)
  const {rideType, stops} = publishRideData || ''

const dispatch = useDispatch()

  const handleStopOver =()=>{
    if (stops!= undefined){
      if (stops.length >= 4){
        DropDownHolder.dropDown.alertWithType('error', 'Error', 'Maximun 4 stopovers can be selected')
      }else {
        navigation.navigate(HOME.pickLocation, {key:'stopOvers'})
      }
    }else{
      navigation.navigate(HOME.pickLocation, {key:'stopOvers'})}
  }

  const handleCancel =(item)=>{
    let arr = stops
    let index = arr.indexOf(item)
    arr.splice(index, 1)
    dispatch(saveStopOvers(arr))
  }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
      <SafeAreaView style={styles.container}>
        <Header left={
            <TouchableOpacity onPress={() => navigation.navigate(TABS.publishRides)}>
              <Image source={Images.leftArrow} style={{tintColor: '#000000'}} />
            </TouchableOpacity>
          }
        />

        <View style={{padding: '5%'}}>
          <Text style={styles.headingText}>
            {strings.addStopOvers.addYourStopOvers}
          </Text>
        </View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <Button
            mainViewStyle={[styles.searchButton, {width: '100%'}]}
            text={strings.addStopOvers.addAddress}
            textStyle={{color: '#64748B89', fontFamily:Fonts.Lato400}}
            leftIconEnable={true}
            leftText={true}
            fontFamily={Fonts.Lato400}
            onPress={()=> handleStopOver()}
          />

         <View style={{flexDirection:'row', marginTop:'5%', flexWrap:'wrap'}}>
          {stops && stops.map((item, index)=>(
            <View style={styles.stopOverContainer} key={index}>
              <Text style={{width:'80%'}} numberOfLines={1} >{item.address}</Text>
              <Entypo name='cross'
              style={{width:"20%", alignSelf:'center', textAlign:'center'}}
              size={15}
              onPress={()=>handleCancel(item)}
              />
            </View>
          ))
          }
          </View>

          <Button
            onPress={() =>navigation.navigate(PUBLISH_RIDES.pickDatesPublishRides, {type: rideType})}
            textStyle={{textAlign: 'center'}}
            text={strings.publishRide.next}
            mainViewStyle={styles.searchButtonBlue}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
