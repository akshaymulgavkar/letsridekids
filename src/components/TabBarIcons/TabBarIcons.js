import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'react-native'
import {Images} from '../../assets/assets.path'
import {TABS} from '../../constants/Navigation.Constants'
const InactivetabIcon = {
    [TABS.home]:Images.footerHomeUnfilled,
    [TABS.chats]:Images.footerChat,
    [TABS.profile]:Images.footerProfile,
    [TABS.publishRides]:Images.footerPublishRide,
    [TABS.rides]:Images.footerCar
}
const activetabIcon = {
    [TABS.home]:Images.footerHome,
    [TABS.chats]:Images.footerChatFilled,
    [TABS.profile]:Images.footerProfileFilled,
    [TABS.publishRides]:Images.footerPublishRideFilled,
    [TABS.rides]:Images.footerCarFilled
}
export function TabBarIcon(props) {
  let {  routeName,focused }=props

  let Icon=focused?activetabIcon[routeName]:InactivetabIcon[routeName]
    return (
      <Image
        accessibilityIgnoresInvertColors
        source={Icon}
      />
    );
  }
  
  TabBarIcon.propTypes = {
    routeName: PropTypes.string.isRequired,
  };