import {  Text, View ,StatusBar, ScrollView,  FlatList, Image, RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import {styles} from './Chats.Styles' 
import {ChatListItem} from '../../components'
import { CHATS } from '../../constants/Navigation.Constants'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/selectors/User.Selectors'
import { Images } from '../../assets/assets.path'
import { strings } from '../../Localization/Localization'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Chats = ({navigation}) => {

  const user = useSelector(getUser)

  const [chatList ,setChatList] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection('rooms')
      .where('users', 'array-contains', user?._id)
      .onSnapshot(documentSnapshot => {
        // console.log('User data: ', documentSnapshot?.docs?.map(docSnap=>docSnap.data()));
        const allUsers = documentSnapshot?.docs?.map(docSnap=>docSnap.data())
        setChatList(allUsers)
      });

    return () => subscriber();
  }, []);

  const listEmpty =()=>{
    return (
      <View style={{flex:1, alignItems:'center'}}>
          <Image source={Images.NoMessages} style={{marginTop:'25%'}} resizeMode="cover"/>
          <Text style={styles.noMessage}>{strings.ChatsScreen.noMessage}</Text>
          <Text style={styles.noInbox}>{strings.ChatsScreen.noMessageInbox}</Text>
          <Text style={styles.noInbox}>{strings.ChatsScreen.startChatting}</Text>
      </View>
    )
  }
  const renderItem =(item, index)=>{
    return(<ChatListItem data={item} handleNavigtaion={()=>navigation.navigate(CHATS.chatDetails, {roomDetails:item, key:'listing'})}/>)
  }

  return (
    <>
        <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <SafeAreaView style={styles.SafeAreaView}>
        <Text style={styles.profileText}>{strings.bottomTab.chats}</Text>
        <FlatList
          data={chatList}
          renderItem={({item, index})=>renderItem(item, index)}
          keyExtractor={(item, index) => index}
          style={{marginTop:'5%'}}
          ListEmptyComponent={()=>listEmpty()}
          />
        
        </SafeAreaView>
    </>
  )
}

