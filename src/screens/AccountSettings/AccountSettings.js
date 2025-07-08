import {Image, StatusBar, Text, TouchableOpacity, View, Switch, Linking, ActivityIndicator, Alert,ScrollView} from 'react-native';
import React, {useState} from 'react';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button,checkToken} from '../../components';
import {styles} from './AccountSettings.Styles'
import {Images} from '../../assets/assets.path';
import { PROFILE } from '../../constants/Navigation.Constants';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES, ToggleNotifications, deleteAccount, logout } from '../../redux/actions/User.Actions';
import axios from 'axios';
import { getUser } from '../../redux/selectors/User.Selectors';
import { Overlay } from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors';


export const AccountSettings = ({navigation}) => {

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const isDeleteLoading =  useSelector(state => isLoadingSelector([TYPES.DELETEACCOUNT], state));
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [isEnabled, setIsEnabled] = useState(user?.notification);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleSwitch = (data) => setIsEnabled(data);

  const handleToggle= async ()=>{
    console.log({isEnabled})
    let params
    if(isEnabled == true){
      params ={
        notifiPermission:"false"
      }
    }
    else if (isEnabled == false){
     let data = {
      notifiPermission:"true"
      }
      params = await checkToken(data)
    }
    dispatch(ToggleNotifications(params, cancelToken.token, (data)=>{
      toggleSwitch(data?.data?.notification)
  }))
   
  }

  const urls ={
    tnc:'https://letsridekids.com/terms-conditions/',
    privacyPolicy:'https://letsridekids.com/privacy-policy/',
    supportChat:'https://letsridekids.com/contact/'
  }
  const openURI = async (url) => {
 
    // console.log({url})
    // const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    // if (supported) {
    await Linking.openURL(url); // It will open the URL on browser.
    // } else {
    // Alert.alert(`Don't know how to open this URL: ${url}`);
    // }
    }

  return (
    <>
  <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>

          <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
          </TouchableOpacity>

        <Text style={styles.accountSettingsText}>{strings.profile.accountSettings}</Text>

        <View style={{width:'95%', alignSelf:'center', marginTop:'5%'}}>
        <View style={styles.toggleContainer}>
          <Text style={styles.buttonText}>{strings.profile.pushNotifications}</Text>
          <Switch trackColor={{ false: "silver", true: "#00F9FF" }} thumbColor={isEnabled ? "#fff" : "#fff"} onValueChange={()=>handleToggle()} value={isEnabled}  style={{}}/>
        </View>

        <Button leftText={true} text={strings.profile.help} mainViewStyle={styles.buttonStyles} textStyle={styles.buttonText} rightIconEnable={true} rightIconViewStyle={styles.rightIcon} rightIcon={<Image source={Images.rigntArrow} style={{tintColor:'#000'}}/>} 
        onPress={()=> openURI(urls.supportChat)}
        />
        <Button leftText={true} text={strings.profile.changePassword} mainViewStyle={styles.buttonStyles} textStyle={styles.buttonText} rightIconEnable={true} rightIconViewStyle={styles.rightIcon} rightIcon={<Image source={Images.rigntArrow} style={{tintColor:'#000'}}/>} onPress={()=> navigation.navigate(PROFILE.changePassword)}/>
        <Button leftText={true} text={strings.profile.termsAndConditions} mainViewStyle={styles.buttonStyles} textStyle={styles.buttonText} rightIconEnable={true} rightIconViewStyle={styles.rightIcon} rightIcon={<Image source={Images.rigntArrow} style={{tintColor:'#000'}}/>}  
        onPress={()=> openURI(urls.tnc)}
        />
        <Button leftText={true} text={strings.profile.privacyPolicy} mainViewStyle={styles.buttonStyles} textStyle={styles.buttonText} rightIconEnable={true} rightIconViewStyle={styles.rightIcon} rightIcon={<Image source={Images.rigntArrow} style={{tintColor:'#000'}}/>}  
        onPress={()=> openURI(urls.privacyPolicy)}
        />
        <Button leftText={true} text={strings.profile.deleteMyAccount} mainViewStyle={styles.buttonStyles} textStyle={styles.buttonText} rightIconEnable={true} rightIconViewStyle={styles.rightIcon} rightIcon={<Image source={Images.rigntArrow} style={{tintColor:'#000'}}/>}  
        onPress={()=> setDeleteModal(true)}
        />
      
        </View>
      </ScrollView>

      <Overlay isVisible={deleteModal} onBackdropPress={() => setDeleteModal(false)} overlayStyle={styles.overlayStyle}>
        <View style={{ backgroundColor: '#fff', borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
          <Entypo name='cross' color='#000000' style={{ alignSelf: 'flex-end', marginEnd: 10, marginTop: 10 }} size={25} onPress={() => setDeleteModal(false)} />
          <Image source={Images.logout} style={{ alignSelf: 'center', marginBottom: '5%' }} />
          <Text style={styles.wipeText}> Are you sure you want to delete your account?</Text>
          <TouchableOpacity onPress={() => dispatch(deleteAccount(cancelToken.token))} style={styles.overlayBtn}>
            {isDeleteLoading?
            <ActivityIndicator style={{padding:5}}/>
            :<Text style={styles.overlayBtnText}>Delete Account</Text>}
          </TouchableOpacity>
        </View>
      </Overlay>

    </SafeAreaView>
  </>
  )
}
