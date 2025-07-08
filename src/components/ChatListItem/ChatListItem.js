import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../assets/assets.path'
import { styles } from './ChatListItem.Styles'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/selectors/User.Selectors'
import moment, { months } from 'moment'

export const ChatListItem = ({ data, handleNavigtaion }) => {

  const user = useSelector(getUser)
  const [userData] = useState(data?.usersReadDetails[1]?.userId == user?._id ? data?.usersReadDetails[0] : data?.usersReadDetails[1])
  const unreadCount = data?.usersReadDetails?.find((obj) => String(obj.userId) === String(user?._id)).unreadCount;
  const { name, profileImage } = userData?.userDetail;
  const { message } = data?.last_message;
  const time = moment(data?.last_message?.createdAt?.toDate()).format('hh:mm a')


  return (

    <TouchableOpacity style={styles.container} onPress={() => handleNavigtaion()}>
      <View style={{ width: '18%' }}>
        <Image source={profileImage? {uri:profileImage}:Images.profilePic} resizeMode="cover" style={{width:55, height:55, borderRadius:100}}/>
      </View>

      <View style={{ width: '62%' , marginTop:5}}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        {data?.last_message?.userId != userData?.userId ? <Text style={styles.message}>You: {message}</Text> : <Text style={unreadCount>0? styles.messageUnread:styles.message}>{message}</Text>}
      </View>

      <View style={{ width: '20%', marginTop:5, left:'30%' }}>
        <Text style={styles.timeText}>{time}</Text>
        {unreadCount > 0 && <View style={styles.messageCountContainer}>
          {/* <Text style={styles.messageCount}>{unreadCount}</Text> */}
        </View>}
      </View>
    </TouchableOpacity>
  )
}

