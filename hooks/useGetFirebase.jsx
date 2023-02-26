import React from 'react'
import { firestore } from '@/utils/firebase';

// react hook that gets collection from firebase
export const useGetFirebase = () => {

    const [streamers, setStreamers] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const db = firestore;
            const data = await db.collection('streamers').get();
            setStreamers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    return ([streamers]);
}
