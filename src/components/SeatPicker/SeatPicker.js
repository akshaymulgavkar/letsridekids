import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './SeatPicker.Styles';
import {Images} from '../../assets/assets.path';
import {BottomSheet} from '@rneui/base';
import { saveSeats } from '../../redux/actions/SearchRides.Action';
import { useDispatch } from 'react-redux';

export const SeatPicker = (props) => {

  const dispatch = useDispatch()

   const {isVisible, seats, setSeats ,setIsVisible} = props ||false

  const handleSeatCount = data => {
    if (data === 'Minus') {
      if (seats > 1) {
        setSeats(seats - 1);
      }
    } else if (data === 'Plus') {
      if (seats < 4) {
        setSeats(seats + 1);
      }
    }
  }

  return (
    <BottomSheet isVisible={isVisible} >
      <View style={styles.seatsContainer}>

    <View style={{flexDirection:'row', marginBottom:'8%'}}>
      <View style={{padding: 10, width: '70%'}}>
        <Text style={styles.dateTimeText}>Number of riders</Text>
      </View>

      <View style= {styles.doneBtnContainer}>
        <TouchableOpacity onPress={()=>setIsVisible(!isVisible) || dispatch(saveSeats(seats))} style={styles.doneBtn}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>


    <View style={{flexDirection:'row', marginBottom:'8%'}}>
      <TouchableOpacity onPress={() => handleSeatCount('Minus')} style={{width: '30%'}}>
          <Image source={Images.minus} style={ seats === 1 ? {alignSelf: 'center', tintColor: '#000000040'} : {alignSelf: 'center', tintColor: '#00F9FF'}} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.seatsText}> {seats} </Text>
        </View>
        <TouchableOpacity onPress={() => handleSeatCount('Plus')} style={{width: '30%'}}>
          <Image source={Images.plus} style={ seats === 4 ? {alignSelf: 'center', tintColor: '#000000040'} : {alignSelf: 'center', tintColor: '#00F9FF'}} resizeMode="contain"/>
        </TouchableOpacity>
    </View>

      </View>
    </BottomSheet>
  );
};
