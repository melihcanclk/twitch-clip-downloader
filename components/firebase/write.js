import firebase from 'firebase/app';
import { firestore } from '../../utils/firebase';
import { useRef } from 'react';


const getCurrentTimestamp = () => {
    // get current timestamp as date T time
    const date = new Date();
    const timestamp = date.getTime();
    return timestamp;
}


const WriteToFirestore = ({ entries, setEntries }) => {
    const usernameRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();

    const sendData = (data) => {
        const { username, firstname, lastname } = data;
        const _data = {
            username,
            firstname,
            lastname,
            sendDate: getCurrentTimestamp()
        }
        try {
            firestore.collection("streamers").add(_data).then(() => {
                // get new data from firestore
                // because we cannot get id after adding new item to firestore
                // we need to get all data from firestore
                firestore.collection("streamers").get().then((entries) => {
                    const entriesData = entries.docs.map((entry) => ({
                        id: entry.id,
                        ...entry.data()
                    }))
                    setEntries(entriesData);
                    alert("Data inserted successfully");
                })
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Write to Firestore</h1>
            <input ref={usernameRef} type="text" placeholder="Username" />
            <input ref={firstnameRef} type="text" placeholder="Firstname" />
            <input ref={lastnameRef} type="text" placeholder="Lastname" />
            <button onClick={() =>
                sendData(
                    {
                        username: usernameRef.current.value,
                        firstname: firstnameRef.current.value,
                        lastname: lastnameRef.current.value,
                    }
                )}>Insert Test</button>
        </div>
    )

}

export default WriteToFirestore;