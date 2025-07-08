import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { FirestoreUtils } from "../../utils";
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/Selectors/UserSelectors";


export const useRoomUnreadCount = (roomId) => {

    const [count, setCount] = useState(0);
    const user = useSelector(getUser)

    useEffect(() => {
        if (!roomId || !user)
            return
        const unsubscribe = firestore()
            .collection('rooms')
            .doc(roomId)
            .onSnapshot(async (query) => {
                let room = await FirestoreUtils.parseRoom(query);
                let { unreadCountDetails } = room
                setCount(unreadCountDetails[user?.uuid] ?? 0)
            })
        return () => {
            if (unsubscribe)
                unsubscribe();
        }
    }, [user])


    return { count, setCount };
}