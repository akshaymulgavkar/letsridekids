import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { FirestoreUtils } from "../../utils";


export const useRoom = (roomId) => {

    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (!roomId)
            return
        const unsubscribe = firestore()
            .collection('rooms')
            .doc(roomId)
            .onSnapshot(async (query) => {
                let room = await FirestoreUtils.parseRoom(query);
                setRoom(room)
            })
        return () => {
            unsubscribe();
        }
    }, [])


    return { room };
}