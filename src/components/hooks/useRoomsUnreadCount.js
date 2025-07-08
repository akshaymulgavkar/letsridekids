import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { FirestoreUtils } from "../../utils";
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/Selectors/UserSelectors";


export const useRoomsUnreadCount = () => {

    const [count, setCount] = useState(0);
    const user = useSelector(getUser)

    useEffect(() => {
        if (!user)
            return
        const unsubscribe = firestore()
            .collection('rooms')
            .onSnapshot(async (query) => {
                let rooms = await FirestoreUtils.parseRoomQueryDoc(query);
                var unreadCount = 0;
                rooms?.forEach(room => {
                    let { unreadCountDetails } = room
                    unreadCount += unreadCountDetails[user?.uuid] ?? 0
                })
                setCount(unreadCount)
            })
        return () => {
            if (unsubscribe)
                unsubscribe();
        }
    }, [user])


    return { count, setCount };
}