import React, {useState} from 'react';
import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {styles} from './PublishRides.Styles';
import {RadioButton} from 'react-native-paper';
import {Fonts} from '../../theme/Fonts';
import {Button} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {HOME, PUBLISH_RIDES} from '../../constants/Navigation.Constants';
import {getPostRidesData} from '../../redux/selectors/PostRides.Selectors';
import {useDispatch, useSelector} from 'react-redux';
import { clearPublishData, saveFromLatLongPublish, saveRideTypePublishRide, saveToLatLongPublish} from '../../redux/actions/PublishRides.Action';
import {DropDownHolder} from '../../utils/DropDownHolder';
import { Overlay } from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';

export const PublishRides = ({navigation}) => {
  const postRidesData = useSelector(getPostRidesData);

  const [checked, setChecked] = useState(
    postRidesData?.rideType ? postRidesData?.rideType : 'selectiveDays',
  );

  const dispatch = useDispatch();


  const swapLocations = () => {
    if (postRidesData?.editType == true){
      DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'cannot modify locations');
    }
    else{
      let newDestination = postRidesData?.pickLatLong;
      let newSourceLocation = postRidesData?.dropLatLong;
  
      dispatch(saveFromLatLongPublish(newSourceLocation));
      dispatch(saveToLatLongPublish(newDestination));}
  };

  const handleNext = () => {
    if (postRidesData?.pickLatLong && postRidesData?.dropLatLong) {
      dispatch(saveRideTypePublishRide(checked));
      navigation.navigate(PUBLISH_RIDES.addStopOvers);
    } else { DropDownHolder.dropDown.alertWithType( 'error', 'Error', 'Please enter valid locations');
    }
  };

  const handleChangeRideType = data => {
    if (postRidesData?.editType) {
      if (data === checked) {
      }
      else {
        setChecked(data)
        dispatch(saveRideTypePublishRide(data))
      }
    } else {
      dispatch(saveRideTypePublishRide(data))
      setChecked(data)
    }
  }

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
     setVisible(!visible);
   };
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
      <SafeAreaView style={styles.container}>
        <View style={{padding: '5%'}}>
          {postRidesData?.editType === true ?<Text style={styles.headingText}>{strings.publishRide.editRide}
          </Text> : <Text style={styles.headingText}>{strings.publishRide.publishRide}</Text>}
        </View>

        <View style={styles.checkboxView}>
          <TouchableOpacity
            style={styles.checkboxText}
            onPress={() => handleChangeRideType('selectiveDays')}>
            <RadioButton.Android
              value="selectiveDays"
              status={checked === 'selectiveDays' ? 'checked' : 'unchecked'}
              color="#8913D1"
              onPress={() => handleChangeRideType('selectiveDays')}
            />
            <Text
              style={[
                {color: checked == 'selectiveDays' ? '#000' : 'gray'},
                styles.rideTypeText,
              ]}>
              {strings.home.selectiveDays}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxText}
            onPress={() => handleChangeRideType('recurring')}>
            <RadioButton.Android
              value="recurring"
              status={checked === 'recurring' ? 'checked' : 'unchecked'}
              color="#8913D1"
              onPress={()=> handleChangeRideType('recurring')}
            />
            <Text
              style={[
                {color: checked == 'recurring' ? '#000' : 'gray'},
                styles.rideTypeText,
              ]}>
              {strings.home.recurring}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <Button
            onPress={() =>
              navigation.navigate(HOME.pickLocation, {key: 'fromPublishRide'})
            }
            mainViewStyle={[styles.searchButton, {width: '100%'}]}
            text={
              postRidesData?.pickLatLong
                ? postRidesData?.pickLatLong?.address
                : strings.home.from
            }
            textStyle={
              postRidesData?.pickLatLong
                ? {color: '#000', width: '80%', fontFamily:Fonts.Lato400}
                : {color: '#64748B89', width: '80%', fontFamily:Fonts.Lato400}
            }
            leftIconEnable={true}
            leftIcon={
              <Image
                source={Images.EllipseHome}
                style={{top: '25%'}}
                resizeMode="cover"
              />
            }
            rightIconEnable={true}
            rightIcon={
              <TouchableOpacity onPress={() => swapLocations()}>
                <Image source={Images.swapLocations} />
              </TouchableOpacity>
            }
            rightIconViewStyle={styles.SwapIcon}
            leftText={true}
            fontFamily={Fonts.Lato400}
            disabled={postRidesData?.editType}
          />
          <Image
            source={Images.DashedLineHome}
            style={{position: 'absolute', left: '4.4%', top: '21%'}}
          />
          <Button
            onPress={() =>
              navigation.navigate(HOME.pickLocation, {key: 'toPublishRide'})
            }
            mainViewStyle={[styles.searchButton, {width: '100%'}]}
            text={
              postRidesData?.dropLatLong
                ? postRidesData?.dropLatLong?.address
                : strings.home.destination
            }
            textStyle={
              postRidesData?.dropLatLong
                ? {color: '#000', fontFamily:Fonts.Lato400}
                : {color: '#64748B89', fontFamily:Fonts.Lato400}
            }
            leftIconEnable={true}
            leftIcon={
              <Image
                source={Images.EllipseHome}
                style={{top: '25%'}}
                resizeMode="cover"
              />
            }
            leftText={true}
            fontFamily={Fonts.Lato400}
            disabled={postRidesData?.editType}
          />

          {postRidesData?.editType && (
            <TouchableOpacity onPress={() => toggleOverlay()} style={{flexDirection:'row', marginTop:'2%'}}>
              <Text style={styles.rideEditWarning}>
                Cannot edit Start and Stop positions while editing ride, create
                a new ride?
              </Text>
            </TouchableOpacity>
          )}
        
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayStyle}>
           <View style={{backgroundColor:'#fff', borderTopEndRadius:10, borderTopStartRadius:10}}>
              <Entypo name='cross' color='#000000' style={{alignSelf:'flex-end', marginEnd:10, marginTop:10}} size={25} onPress={()=>toggleOverlay()}/>
            <Image source={Images.wipeDate} style={{alignSelf:'center', marginBottom:'5%'}}/>
           <Text style={styles.wipeText}> Previous ride data will be wiped out!</Text>
            <TouchableOpacity onPress={()=> toggleOverlay() || dispatch(clearPublishData())}  style={styles.overlayBtn}>
              <Text style={styles.overlayBtnText}>Wipe</Text>
            </TouchableOpacity>
           </View>
          </Overlay>
          <Button
            onPress={() => handleNext()}
            textStyle={{textAlign: 'center', fontSize: hp('2%')}}
            text={strings.publishRide.next}
            mainViewStyle={styles.searchButtonBlue}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

