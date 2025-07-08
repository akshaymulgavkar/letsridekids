import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { FirestoreUtils } from "../../utils";
import { array } from "prop-types";
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/Selectors/UserSelectors";
import storage from '@react-native-firebase/storage';

export const useMessages = (roomId) => {
    const [messages, setMessages] = useState([]);
    const user = useSelector(getUser)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection(`rooms/${roomId}/messages`)
            .orderBy('createdAt', 'desc')
            .onSnapshot(async (snapshot) => {
                setMessages(snapshot?.docs.map(doc => {
                    return doc.data()
                }))
            })

        return () => {
            unsubscribe();
        }
    }, [])

    return { messages, setMessages };
}

export const sendMessage = async (user, room, message) => {

    let { unreadCountDetails } = room

    room?.users?.forEach(element => {
        if (element.id != user?.uuid)
            unreadCountDetails[element.id] = unreadCountDetails[element.id] ?
                unreadCountDetails[element.id] + 1 : 1;
    });

    updateRoom(message, room?.id, unreadCountDetails)

    let response = await firestore()
        .collection(`rooms/${room?.id}/messages`)
        .add({
            ...message
        }).catch(error => {
            console.log('OnMessageSentError: ', error)
        })

}

export const updateRoom = async ({ createdAt, text }, roomId, unreadCountDetails) => {
    await firestore()
        .collection('rooms')
        .doc(roomId)
        .update({
            updatedAt: createdAt,
            lastMessage: text,
            unreadCountDetails: unreadCountDetails
        })
}

export const sendImageMessage = async (user, room, message) => {
    const name = message.uri?.split('/').pop()
    const reference = storage().ref(name)

    await reference.putFile(message.uri)
    const downloadUri = await reference.getDownloadURL()

    await firestore()
        .collection(`rooms/${room?.id}/messages`)
        .add({
            ...message,
            uri: downloadUri
        }).then(res => {
            console.log('sendMessage Response:', res);
        }).catch(err => {
            alert(err.message)
        })
}
