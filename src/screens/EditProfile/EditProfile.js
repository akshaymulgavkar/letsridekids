import {Image, StatusBar, Text, TouchableOpacity, View, Switch, Touchable, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components';
import {styles} from './EditProfile.Styles'
import {Images} from '../../assets/assets.path';
import {useDispatch, useSelector} from 'react-redux';
import { getUser } from '../../redux/selectors/User.Selectors';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { TYPES, UpdateProfile } from '../../redux/actions/User.Actions';
import { DropDownHolder } from '../../utils/DropDownHolder';
import DatePicker from 'react-native-date-picker';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { Overlay } from '@rneui/themed';
import moment from 'moment';
import {TABS} from '../../constants/Navigation.Constants'
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';

export const EditProfile = ({navigation}) => {

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_USER], state))

  const user = useSelector(getUser);

  const [profileImage, setProfileImage] = useState(user?.profileImage)
  const [name, setName] = useState(user?.fullname)
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfbirth??'')
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const dispatch = useDispatch()

  const handleValidations =()=>{
    if (dateOfBirth?.length <= 0){
      DropDownHolder.dropDown.alertWithType('error', "Error", "Please select a valid date of birth")
      return false
    }
    else if (name?.length<3){
      DropDownHolder.dropDown.alertWithType('error', "Error", "Please enter a valid name")
      return false
    }
    else {
      return true
    }
  }

  const handleSave =()=>{

    const updateProfileValidations = handleValidations() 
   
    if (updateProfileValidations){
    try {
      let profileImageData ={ uri:profileImage,
      type:'image',
      name:profileImage+'/profilePic'
    }
      let data=new FormData()

      data.append('dateOfbirth',dateOfBirth.toString())
      data.append('fullname',name)
      {profileImage?.length>0 ? data.append('profileImage', profileImageData): null}

      console.log({data})
      dispatch(UpdateProfile(data, cancelToken.token, ()=>{
        navigation.navigate(TABS.profile)
      }))

    } catch (error) {
      console.log('error', error)
    }
   }
  }

    const handleProfileImage = (type="photo") => {
      let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
      };
      launchImageLibrary(options, (response) => {
          if (response.didCancel) {
          return;
          } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
          } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
          } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
          }
          setProfileImage(response?.assets[0]?.uri);
      })
      } 

      
  const [time, setTime] = useState(user?.dateOfbirth != ''?new Date(user?.dateOfbirth): new Date());
  const [show, setShow] = useState(false);

  const onDateSelected=( selectedTime)=> {
    const currentDate = selectedTime || time;
    console.log({selectedTime})
    setDateOfBirth(currentDate)
    setTime(currentDate)
  };


  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
        </TouchableOpacity>

        <Text style={styles.editProfileText}>{strings.profile.editYourProfile}</Text>
          
           <Image style={styles.profileImageContainer} source={profileImage?.length>0?{uri:profileImage}: user?.profileImage ? {uri :user?.profileImage }:Images.profilePic }/> 
            <TouchableOpacity style={{backgroundColor:'#00F9FF', width:'20%', borderRadius:20, marginStart: '7%', bottom:'2%'}} onPress={()=> handleProfileImage()}>
              <Text style={styles.editText}>{strings.profile.edit}</Text>
            </TouchableOpacity>

        <TextInput style={styles.inputContainer} mode="outlined" label={strings.profile.name} right={<TextInput.Icon name="account"/>} value={name} onChangeText={(e)=>setName(e)} />

        <TextInput style={styles.inputContainer} mode="outlined" label={strings.profile.dateOfBirth}  right={<TextInput.Icon name="calendar" onPress={()=> setShow(true)}/>} value={dateOfBirth !='' ?moment(dateOfBirth).local().format('MMM DD YYYY'): ''} editable={false} onPressIn={()=> setShow(true)}/>

        <Button text={strings.profile.save} textStyle={styles.saveBtn} mainViewStyle={[styles.btnContainer, {marginTop:'10%'}]} leftIconEnable={true}  onPress={()=> handleSave()} Loading={isLoading} disabled={isLoading}/>


          <Overlay isVisible={show} onBackdropPress={()=>setShow(false)} style={{borderRadius:25}}>
          <View style={{flexDirection:'column', width:'100%'}}>

        <View style={styles.doneBtnContainer}>
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={styles.doneBtn}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </View>
            
        <DatePicker 
          date={time} 
          onDateChange={onDateSelected} 
          mode="date"
          value={time}
          style={{alignSelf:'center',marginTop:'10%'}}
          theme='light'
          androidVariant='nativeAndroid'
          maximumDate={new Date()}
          locale='us'
          />
            
          </View>  
        </Overlay>
      </SafeAreaView>
    </>
  )
}

export default EditProfile
