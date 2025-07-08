import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/User.Selectors";

export const useMessageRead = (roomId) => {
    const [count, setCount] = useState(0);
    const user = useSelector(getUser)

    useEffect(() => {
        if (!user)
            return
        const unsubscribe = firestore()
            .collection(`rooms/${roomId}/messages`)
            .orderBy('createdAt', 'desc')
            .onSnapshot(async (snapshot) => {
                let doc = await firestore()
                    .collection('rooms')
                    .doc(roomId).get()
                let room = doc.data();
                var { usersReadDetails } = room
                let updateData = usersReadDetails?.map(data => {
                    if (data?.userId === user?._id) {
                        return { ...data, unreadCount: 0 }
                    }
                    return data
                })
                updateRoom(roomId, updateData)
            })
        return () => {
            if (unsubscribe)
                unsubscribe();
        }
    }, [user])

    return { count, setCount };
}

export const sendMessageFirebase = async (room, message, user) => {

    let { usersReadDetails } = room
    let arr = [...usersReadDetails]
    arr = arr?.map(element => {
        if (element.userId != user?._id) {
            return ({ ...element, unreadCount: element?.unreadCount + 1 })
        }
        return element
    });
    updateRoom(room?.roomId, arr)

    let updateMessage = await firestore().collection('rooms').doc(room?.roomId).collection('messages').add(({ ...message, createdAt: firestore.FieldValue.serverTimestamp() })).then(console.log('successfully message sent'))
    let updateLastMessage = await firestore().collection('rooms').doc(room?.roomId).update({ 'last_message.createdAt': firestore.FieldValue.serverTimestamp(), 'last_message.message': message?.text, 'last_message.userId': user?._id }).then(console.log('successfully message sent'))
}

export const updateRoom = async (roomId, usersReadDetails) => {
    if (usersReadDetails) {
        await firestore()
            .collection('rooms')
            .doc(roomId)
            .update({
                usersReadDetails: usersReadDetails
            })
    }
}

