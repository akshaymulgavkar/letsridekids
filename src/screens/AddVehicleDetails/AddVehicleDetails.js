import {  Text, View, StatusBar,  TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { useState } from 'react'
import {styles} from './AddVehicleDetails.Styles'
import { strings } from '../../Localization/Localization'
import { Images } from '../../assets/assets.path'
import {InputBox,Button} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleDetails, TYPES } from '../../redux/actions/User.Actions'
import axios from 'axios'
import { TABS } from '../../constants/Navigation.Constants'
import { DropDownHolder } from '../../utils/DropDownHolder'
import { isLoadingSelector } from '../../redux/selectors/Status.Selectors'
import CountryPicker from 'rn-country-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context'

export const AddVehicleDetails = ({navigation}) => {

    const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_USER], state))
  
    const [steps, setSteps] = useState(1)
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

    const dispatch = useDispatch()

    const [vehicleData, setVehicleData] = useState({
      country:'',
      state:'',
      lisenceNumber:'',
      vehicleBrand:'',
      vehicleType:'',
      vehicleModel:'',
      yearOfManufacture:'',
      vehicleColor:''
    })

    function containsNumbers(str) {
      return /\d/.test(str);
    }

    function containsAlphabets(str){
      return /[a-zA-Z]/g.test(str)
    }

    function containsSpecial(str){
      return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
    }

    const handleValidationStep1 =()=>{
      console.log('containsSpecial(vehicleData.state)', containsSpecial(vehicleData.state))
      if (vehicleData.country.length<=0){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid country")
        return false
      }
      else if (vehicleData.state.length<=0 || containsSpecial(vehicleData.state)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid state")
        return false
      }
      else if (vehicleData.lisenceNumber.length<=3|| containsSpecial(vehicleData.lisenceNumber)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid license number")
        return false
      }
      else if(containsNumbers(vehicleData.state)){
        DropDownHolder.dropDown.alertWithType('error','Error', "State cannot contain numbers")
        return false
      }
      else return true
    }

    const handleValidationStep2 =()=>{
      if (vehicleData.vehicleBrand.length<=0 || containsSpecial(vehicleData.vehicleBrand) ){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid vehicle brand")
        return false
      }
      else if (vehicleData.vehicleType.length<=0 || containsSpecial(vehicleData.vehicleType)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid vehicle type")
        return false
      }
      else if (vehicleData.vehicleModel.length<=0 || containsSpecial(vehicleData.vehicleModel)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid vehicle model")
        return false
      }
      else if (vehicleData.yearOfManufacture.length<=0 || vehicleData.yearOfManufacture.length>4 || containsSpecial(vehicleData.yearOfManufacture)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid year of manufacture")
        return false
      }
      else if ( vehicleData.yearOfManufacture > new Date().getFullYear()|| vehicleData.yearOfManufacture < 1985 )  {
        DropDownHolder.dropDown.alertWithType('error','Error', "Year of manufacture cannot be greater than current year")
        return false
      }
      else if (vehicleData.vehicleColor.length<=0|| containsSpecial(vehicleData.vehicleColor) ){
        DropDownHolder.dropDown.alertWithType('error','Error', "Please enter a valid vehicle color")
        return false
      }
      else if(containsNumbers(vehicleData.vehicleColor)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Vehicle color cannot contain numbers")
        return false
      }
      else if(containsNumbers(vehicleData.vehicleBrand)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Vehicle brand cannot contain numbers")
        return false
      }
      else if(containsAlphabets(vehicleData.yearOfManufacture)){
        DropDownHolder.dropDown.alertWithType('error','Error', "Enter valid year of manufacture")
        return false
      }
      else return true
    }

    const handleNext =()=>{
      if (steps ==1 ){
        const validation1 = handleValidationStep1()
        if (validation1){
          setSteps(2)
      }
      } else{
        const validation2 = handleValidationStep2()
        try {
          if(validation2){
          let params ={
            countryName:vehicleData.country,
            state:vehicleData.state,
            licenseNumber:vehicleData.lisenceNumber,
            vehicaleBrand:vehicleData.vehicleBrand,
            vehicleType:vehicleData.vehicleType,
            vehicleModel:vehicleData.vehicleModel,
            YOM:vehicleData.yearOfManufacture,
            color:vehicleData.vehicleColor
          }
          dispatch(saveVehicleDetails(params,cancelToken.token, ()=>navigation.navigate(TABS.profile)))
          }
         } catch (error) {
          
        }
      }
    }


  return (
    <>
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.SafeAreaView}>
        <TouchableOpacity style={{marginStart:10, marginTop:10}} onPress={()=>navigation.goBack()}>
            <Image source={Images.leftArrow} style={{tintColor:'#000000'}}/>
        </TouchableOpacity>

        <Text style={styles.editProfileText}>{steps == 1? strings.addVehicleDetails.enterYourCountryAndLisence:strings.addVehicleDetails.entervehicleDetails}</Text>
       {steps==1 ?  
       <View>
        <CountryPicker 
           ContainerStyle={styles.containerCountryPicker}
           InputFieldStyle={styles.countryInputField}
          //  DropdownContainerStyle={styles.myDropdownContainerStyle}
          //  DropdownRowStyle={styles.myDropdownRowStyle}
          // placeHolderStyle={styles.placeHolderStyles}
           Placeholder={'Enter Country'}
           DropdownCountryTextStyle={styles.myDropdownCountryTextStyle}
           countryNameStyle={styles.mycountryNameStyle}
           flagSize={24}
           selectedItem={(e)=>{setVehicleData({...vehicleData, country:e?.country})  
           Keyboard.dismiss()}}
        />

        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.enterState}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.state}
            onChangeText={text => setVehicleData({...vehicleData, state:text})}
          />

        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.lisenceNumber}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.lisenceNumber}
            onChangeText={text => setVehicleData({...vehicleData, lisenceNumber:text})}
          />
       </View>:
       <View>
        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={[styles.inputContainer, {marginTop:'5%'}]}
            placeholder={strings.addVehicleDetails.vehicleBrand}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            autoFocus
            value={vehicleData.vehicleBrand}
            onChangeText={text => setVehicleData({...vehicleData, vehicleBrand:text})}
          />

        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.vehicleType}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.vehicleType}
            onChangeText={text => setVehicleData({...vehicleData, vehicleType:text})}
          />

        <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.vehicleModel}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.vehicleModel}
            onChangeText={text => setVehicleData({...vehicleData, vehicleModel:text})}
          />
          <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.yearOfManufacture}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.yearOfManufacture}
            maxLength={4}
            onChangeText={text => setVehicleData({...vehicleData, yearOfManufacture:text})}
          />
          <InputBox
            textInputStyle={styles.placeHolderText}
            mainViewStyle={styles.inputContainer}
            placeholder={strings.addVehicleDetails.vehicleColor}
            placeholderTextColor="#00000070"
            keyboardType="email-address"
            value={vehicleData.vehicleColor}
            onChangeText={text => setVehicleData({...vehicleData, vehicleColor:text})}
          />
       </View>}

        <Button text={strings.publishRide.next} textStyle={styles.saveBtn} mainViewStyle={[styles.btnContainer, {marginTop:'10%'}]} leftIconEnable={true}  onPress={()=> handleNext()} Loading={isLoading} disabled={isLoading}/>


    </SafeAreaView>
    </>
  )
}