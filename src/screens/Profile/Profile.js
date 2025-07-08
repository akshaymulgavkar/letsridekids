import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  logout, saveUserData,
} from '../../redux/actions/User.Actions';
import {strings} from '../../Localization/Localization';
import {
  getUser,
} from '../../redux/selectors/User.Selectors';

import {VerifyDrivingLisence} from '../../redux/actions/Profile.Actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {styles} from './Profile.Styles';
import {Images} from '../../assets/assets.path';
import {Divider, Button} from '../../components';
import {PROFILE} from '../../constants/Navigation.Constants';
import {Overlay} from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import Inquiry2, {Environment} from 'react-native-persona';

export const Profile = ({navigation}) => {

  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const [logoutVisible, setLogoutVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleVerification = async () => {
              Inquiry2.fromTemplate('itmpl_zFZ4vQkKpa6kZLscmBNfFN9s')
                .environment(Environment.PRODUCTION)
                .onComplete((inquiryId, status, fields) =>
                  {
                  console.log('Inquiry ${inquiryId} completed with status "${status}.',inquiryId ,status)
                  let params ={
                    status:status,
                    verificationId:inquiryId
                  }
                  dispatch(VerifyDrivingLisence(params, cancelToken.token,(data)=>{
                    console.log({data})
                    dispatch(saveUserData(data))
                  })
                  )
                  } 
                )
                .onCanceled((inquiryId, sessionToken) =>
                  console.log('Canceled', `Inquiry ${inquiryId} was cancelled`)
                )
                .onError(error => console.log('Error', error.message))
                .build()
                .start();
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.SafeAreaView}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.profileText}>{strings.profile.profile}</Text>
          {/* dispatch(logout()) */}
          <TouchableOpacity
            style={styles.logoutBtnContainer}
            onPress={() => setLogoutVisible(true)}>
            <Text style={styles.logoutTextStyle}>{strings.profile.logout}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Image
            style={styles.profileImageContainer}
            source={
              user?.profileImage ? {uri: user?.profileImage} : Images.profilePic
            }
          />

          <View
            style={{
              flexDirection: 'column',
              marginTop: '5%',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={styles.nameText}>
                {user?.fullname ?? user?.email?.mail}
              </Text>
              <Image
                source={
                  user?.govtId?.isVerified == true ? Images.verified : null
                }
                style={{marginStart: '2%'}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: '2%',
              }}>
              <Image source={Images.RatingStar} />
              <Text style={{color: '#0000000', marginStart: '1%'}}>
                {user.userRating ? user.userRating : '--'}
              </Text>
            </View>
            <View></View>
          </View>

          <Button
            mainViewStyle={styles.editBtn}
            text={strings.profile.editProfile}
            textStyle={styles.editText}
            rightIcon={
              <Image
                source={Images.rigntArrow}
                style={{tintColor: '#000', left: 5}}
              />
            }
            rightIconEnable={true}
            rightIconViewStyle={styles.rightIcon}
            onPress={() => navigation.navigate(PROFILE.editProfile)}
          />

          <Divider mainViewStyle={[styles.Divider, {marginTop: '5%'}]} />

          <Text style={styles.verifyProfileText}>
            {strings.profile.verifyYourProfile}
          </Text>

          <Button mainViewStyle={styles.editProfileBtn} text={strings.profile.verifyDrivingLisence} textStyle={styles.profileBtnText} leftIcon={<Image style={{ tintColor: '#26185F' }} source={Images.Card} />} disabled={user?.govtId?.isVerified} leftIconEnable onPress={() => handleVerification()}  rightIconEnable={user?.govtId?.isVerified} rightIconViewStyle={styles.rightIcon} rightIcon={<Image style={{ tintColor: '#4BAB00' }} source={Images.profileVerified} />}  />
          <Button
            mainViewStyle={styles.editProfileBtn}
            text={
              user?.email?.isVerified == true
                ? user?.email?.mail
                : strings.profile.verifyEmail
            }
            textStyle={[
              styles.profileBtnText,
              user?.email?.isVerified ? {color: '#00000080'} : null,
            ]}
            leftIcon={
              <Image
                style={
                  user?.email?.isVerified
                    ? {tintColor: '#00000080'}
                    : {tintColor: '#26185F'}
                }
                source={Images.Mail}
              />
            }
            leftIconEnable
            onPress={() => navigation.navigate(PROFILE.addEmail)}
            disabled={user?.email?.isVerified}
            rightIcon={
              <Image
                style={{tintColor: '#4BAB00'}}
                source={Images.profileVerified}
              />
            }
            rightIconEnable={user?.email?.isVerified}
            rightIconViewStyle={styles.rightIcon}
          />
          <Button
            mainViewStyle={styles.editProfileBtn}
            text={
              user?.phone?.isVerified == true
                ? user?.phone?.mobileNumber
                : strings.profile.verifyMobileNumber
            }
            textStyle={[
              styles.profileBtnText,
              user?.phone?.isVerified ? {color: '#00000080'} : null,
            ]}
            leftIcon={
              <Image
                style={
                  user?.phone?.isVerified
                    ? {tintColor: '#00000080'}
                    : {tintColor: '#26185F'}
                }
                source={Images.Call}
              />
            }
            leftIconEnable
            onPress={() => navigation.navigate(PROFILE.addPhoneNumber)}
            disabled={user?.phone?.isVerified}
            rightIcon={
              <Image
                style={{tintColor: '#4BAB00'}}
                source={Images.profileVerified}
              />
            }
            rightIconEnable={user?.phone?.isVerified}
            rightIconViewStyle={styles.rightIcon}
          />

          <Text style={styles.verifyProfileText}>
            {strings.profile.vehicleDetails}
          </Text>
          {user?.VehicleDetails?.vehicleNumber == null ? (
            <Button
              mainViewStyle={styles.editProfileBtn}
              text={strings.profile.addVehicle}
              textStyle={styles.profileBtnText}
              leftIcon={
                <Image style={{tintColor: '#26185F'}} source={Images.Vehicle} />
              }
              leftIconEnable
              onPress={() => navigation.navigate(PROFILE.addVehicleDetails)}
            />
          ) : (
            <View style={styles.vehicleDetailsContainer}>
              <View style={styles.vehicleNameContainer}>
                <Image
                  style={styles.vehicleDetailsRightIcon}
                  source={Images.Vehicle}
                />
                <Text style={styles.vehicleDetailsText}>
                  {user?.VehicleDetails?.vehicleBrand}{' '}
                  {user?.VehicleDetails?.vehicleModel} (
                  {user?.VehicleDetails?.vehicleColor})
                </Text>
                <Image style={styles.carIcon} source={Images.car} />
              </View>
              <Text style={styles.vehicleNumberText}>
                {user?.VehicleDetails?.vehicleNumber}
              </Text>
            </View>
          )}
          <Divider mainViewStyle={styles.Divider} />
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => navigation.navigate(PROFILE.accountSettings)}>
            <Text
              style={[
                styles.accountSettingsText,
                {color: '#000', fontSize: 18, width: '90%'},
              ]}>
              {strings.profile.accountSettings}
            </Text>
            <Image
              source={Images.rigntArrow}
              style={{tintColor: '#000', left: 10}}
            />
          </TouchableOpacity>
          <Divider mainViewStyle={styles.Divider} />
        </ScrollView>
      </SafeAreaView>

      <Overlay
        isVisible={logoutVisible}
        onBackdropPress={() => setLogoutVisible(false)}
        overlayStyle={styles.overlayStyle}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          }}>
          <Entypo
            name="cross"
            color="#000000"
            style={{alignSelf: 'flex-end', marginEnd: 10, marginTop: 10}}
            size={25}
            onPress={() => setLogoutVisible(false)}
          />
          <Image
            source={Images.logout}
            style={{alignSelf: 'center', marginBottom: '5%'}}
          />
          <Text style={styles.wipeText}> Are you sure you want to logout?</Text>
          <TouchableOpacity
            onPress={() => setLogoutVisible(false) || dispatch(logout())}
            style={styles.overlayBtn}>
            <Text style={styles.overlayBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </>
  );
};
