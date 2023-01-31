import firebase from 'firebase/app';
import { firestore } from '../../utils/firebase';
import { useRef } from 'react';


const getCurrentTimestamp = () => {
    // get current timestamp as date T time
    const date = new Date();
    const timestamp = date.getTime();
    return timestamp;
}


const WriteToFirestore = () => {
    const usernameRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();

    const sendData = (data) => {
        const { username, firstname, lastname } = data;

        try {
            firestore.collection("streamers").add({
                username,
                firstname,
                lastname,
                sendDate: getCurrentTimestamp()
            }).then(
                console.log("Document successfully written!")
            );
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