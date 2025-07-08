import React, {useState} from 'react';
import {View,Image,StatusBar,Text} from 'react-native';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../assets/assets.path';
import {Button} from '../../components';
import {TABS} from '../../constants/Navigation.Constants';
import {styles} from './PublishRideDone.Styles'
import { useDispatch } from 'react-redux';
import { clearPublishData } from '../../redux/actions/PublishRides.Action';

export const PublishRideDone = ({navigation}) => {

  const dispatch = useDispatch()
  
  const handleDone=()=>{
    dispatch(clearPublishData())  
    navigation.navigate(TABS.rides)
  }
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaView
        style={styles.container}>
        <View
          style={styles.mainView}>
          <Image
            source={Images.ridePublished}
            style={styles.Image}
            resizeMode="contain"
          />

          <View
            style={styles.publishRideView}>
            <Text
              style={styles.publishRideText}>
              {strings.publishRideDone.ridePublished}
            </Text>

            <Text
              style={styles.publishSuccessText}>
              {strings.publishRideDone.publishSuccess}
            </Text>
          </View>

          <Button
            onPress={() => handleDone()}
            text={strings.passwordChangeDone.done}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
