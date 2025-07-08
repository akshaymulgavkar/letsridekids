import { Image, StatusBar, Text, TouchableOpacity, View, Switch} from 'react-native';
import React from 'react';
import {strings} from '../../Localization/Localization';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './HelpAndSupport.Styles';
import {Images} from '../../assets/assets.path';
import {Divider,Header} from '../../components';
import HelpAndSupportAccordian from '../../components/HelpAndSupportAccordian/HelpAndSupportAccordian';

export const HelpAndSupport = ({navigation, route}) => {


  const {key}= route.params || ''

  const data ={
      question:'What is lets ride kids?',
      answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }



  return (
    <>
     <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
     <SafeAreaView style={styles.SafeAreaView}>
     <Header
            left={
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={Images.leftArrow} style={{tintColor: '#000'}} />
              </TouchableOpacity>
            }
            center={
              <Text style={styles.heading}> {key == 'Help&Support'? strings.profile.help : key == 'PrivacyPolicy' ? strings.profile.privacyPolicy:strings.profile.termsAndConditions} </Text>
            }
            mainContainerStyle={styles.header}
          />

        <Divider mainViewStyle={styles.divider}/>

        <View style={{marginTop:'2%'}}>
          <HelpAndSupportAccordian question={data?.question} answer={data?.answer}/>
          <HelpAndSupportAccordian question={data?.question} answer={data?.answer}/>
          <HelpAndSupportAccordian question={data?.question} answer={data?.answer}/>
        </View>


     </SafeAreaView>
    </>
  )
}