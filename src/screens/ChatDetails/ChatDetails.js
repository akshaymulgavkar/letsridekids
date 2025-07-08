import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GiftedChat, Bubble, InputToolbar, Send, Avatar as ChatAvatar, SystemMessage } from 'react-native-gifted-chat';
import { Images } from '../../assets/assets.path';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/User.Selectors';
import firestore from '@react-native-firebase/firestore'
import { TABS } from '../../constants/Navigation.Constants';
import { Fonts } from '../../theme/Fonts';
import moment from 'moment';
import { sendMessageFirebase, useMessageRead } from '../../components/hooks/useMessageRead';
import {ConfirmBooking} from '../../components';
import { SendNotification } from '../../redux/actions/Profile.Actions';

export const ChatDetails = ({ route, navigation }) => {

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const GiftChatRef = useRef(null)

  const { roomDetails } = route.params || {}

  function handleBackButtonClick()  {
    navigation.navigate(TABS.chats)
    return true;
  }

  useEffect(() => {
     BackHandler.addEventListener('hardwareBackPress',handleBackButtonClick);
      return () =>BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  }, [])


  const [messages, setMessages] = useState([]);
  const [requested, setRequested] = useState(false)

  const sentTo = roomDetails?.users[1] === user?._id ? roomDetails?.users[0] : roomDetails?.users[1]
  const sentToName = roomDetails?.usersReadDetails[1]?.userId == user?._id ? roomDetails?.usersReadDetails[0]?.userDetail : roomDetails?.usersReadDetails[1]?.userDetail
  const chatId = roomDetails?.roomId

  const {count} = useMessageRead(chatId)

  const checkRequestStatus =()=>{
    if (roomDetails?.rideDetail?.instantBook == false && roomDetails?.rideDetail?.requestStatus == true ){
      setRequested(true)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: sentToName?.name ? sentToName?.name:'',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        color: "#000",
        fontFamily: Fonts.Lato700
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(TABS.chats)}>
          <Image source={Images.leftArrow} style={{ tintColor: '#000' }} />
        </TouchableOpacity>
      )
    }
    )
    checkRequestStatus()
  }, [])


  useEffect(() => {
    const msgResponse = firestore().collection('rooms').doc(chatId).collection('messages').orderBy('createdAt', "desc").onSnapshot(documentSnapshot => {
      try {
        const allTheMsgs = documentSnapshot?._docs?.map(docSanp => {
          return { ...docSanp?.data(), createdAt: docSanp?.data()?.createdAt?.toDate() }
        })
        setMessages(allTheMsgs)
      } catch (err) {
        console.log('error is', err)
      }
    })
    return () => { msgResponse() }
  }, []);

  const sendMessage = messageArray => {

    const msg = messageArray[0]
    const myMessage = { ...msg, sentBy: user?._id, sentTo: sentTo, createdAt: new Date() }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMessage))
    sendMessageFirebase(roomDetails, myMessage, user)
    sendNotification(messageArray[0]?.text)
  }

  const sendNotification =(message)=>{
    let params ={
      id:sentTo,
      rideId:roomDetails?.rideDetail?.rideId,
      userId:roomDetails?.users[0],
      message:message
    }
    try {
      dispatch(SendNotification(params))
    } catch (error) {
      console.log({error})
    }
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Image source={Images.SendChat} />
        </View>
      </Send>
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {
          !requested?        
        <GiftedChat
          messages={messages}
          onSend={messages => sendMessage(messages)}
          ref={GiftChatRef}
          user={{ _id: user?._id }}
          renderSend={renderSend}
          alwaysShowSend={true}
          placeholder='Type here...'
          alignTop
          showAvatarForEveryMessage={false}
          renderChatEmpty={(props)=>{
            return(
            <View style={{alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#00000090',fontSize:16 , fontFamily:Fonts.Lato400,transform: [{ rotate: '180deg'}, {rotateY:'180deg'}]}}> Your ride has been successfully booked.{"\n"} You can now chat with publisher and track your ride</Text>
                <Image source={Images.EmptyChat} style={{transform: [{ rotate: '180deg'}], marginTop:10}}/>
                <View style={{height:200}}/>
            </View>)
          }
          }
          renderTime={() => <View></View>}
          renderBubble={props => {
            return <View style={{
              backgroundColor: props.currentMessage.user?._id === user?._id ? '#26185F' : '#00000020',
              minWidth: 130,
              minHeight: 40,
              marginTop: 10,
              padding: 10,
              justifyContent: 'center',
              borderRadius: 10
            }}>
              <Text style={[{ color: props.currentMessage.user?._id === user?._id ? '#fff' : '#00000090' }, { fontFamily: Fonts.Lato400, fontSize: 14, marginBottom:'10%', marginTop:'1%' }]}>{props?.currentMessage?.text}</Text>
              <Text style={[{ color: props.currentMessage.user?._id === user?._id ? '#fff' : '#00000080' }, { fontFamily: Fonts.Lato400, fontSize: 12, textAlign: 'right' }]}>{moment(props?.currentMessage?.createdAt).format('hh:mmA')}</Text>
            </View>
          }}
          renderFooter={() => { return (<View style={{marginTop: 50}} />)}} />
              :
          <ConfirmBooking roomDetails={roomDetails} setRequested={setRequested} name={sentToName?.name}/>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#b12'
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#F4F4F4",
    marginLeft: 15,
    marginRight: 15,
  }
})