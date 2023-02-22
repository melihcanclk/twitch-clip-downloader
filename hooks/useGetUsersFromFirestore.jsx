// get users from firestore collection

import { useEffect, useState } from "react";
import { firestore } from '@/utils/firebase'

const useGetUsersFromFirestore = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // get users from firestore collection
        const getUsers = async () => {
            const entries = await firestore.collection("streamers").get();
            const entriesData = entries.docs.map((entry) => ({
                firestore_id: entry.id,
                ...entry.data()
            }))
            setUsers(entriesData);
        }
        getUsers();

    }, []);
    return [users];
}


export default useGetUsersFromFirestore;