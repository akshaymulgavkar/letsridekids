import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/Selectors/UserSelectors";
import firestore from '@react-native-firebase/firestore';
import { FirestoreUtils } from "../../utils";


export const useRooms = () => {

    const [rooms, setRooms] = useState([]);
    const user = useSelector(getUser)

    useEffect(() => {
        if (!user)
            return
        const unsubscribe = firestore()
            .collection('rooms')
            // .where('userIds', 'array-contains', user?.uuid)
            .orderBy('updatedAt', 'desc')
            .onSnapshot(async (query) => {
                let rooms = await FirestoreUtils.parseRoomQueryDoc(query);
                setRooms(rooms ?? [])
            })
        return () => {
            unsubscribe();
        }
    }, [user])


    return { rooms };
}