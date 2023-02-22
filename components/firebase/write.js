import { firestore } from '../../utils/firebase';
import { useRef } from 'react';


const getCurrentTimestamp = () => {
    // get current timestamp as date T time
    const date = new Date();
    const timestamp = date.getTime();
    return timestamp;
}


const WriteToFirestore = ({ setEntries }) => {
    const usernameRef = useRef();

    const styles = {
        input: {
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        btn: {
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f44336",
            color: "white"
        }
    }

    const sendData = (data) => {
        const { username } = data;
        const _username = username.trim().toLowerCase();
        const _data = {
            username: _username,
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
                    // reset refs
                    usernameRef.current.value = "";
                    alert("Data inserted successfully");
                }).catch((error) => {
                    console.log(error);
                    alert("Error getting data");
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
            <div style={{
                display: "inline-block",
                padding: "10px",
            }}>
                <input style={styles.input} ref={usernameRef} type="text" placeholder="Username" />
                <button style={styles.btn}
                    onClick={() =>
                        sendData(
                            {
                                username: usernameRef.current.value,
                            }
                        )}>Insert</button>
            </div>
        </div>
    )

}

export default WriteToFirestore;