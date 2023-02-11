import { firestore } from '@/utils/firebase'

const ListUser = ({ entries, setEntries }) => {

    return (
        <div>
            {
                entries.map((entry, key) => (
                    <div key={key} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0",
                    }}>
                        <div>
                            <h1>Username : {entry.username}</h1>
                            <p>Name : {entry.firstname}</p>
                            <p>Surname : {entry.lastname}</p>
                            <p>Send Date : {
                                // TODO : locale date
                                new Date(entry.sendDate).toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric"
                                })
                            }</p>
                        </div>
                        <button onClick={() => {
                            firestore.collection("streamers").doc(entry.id).delete().then(() => {
                                const newEntries = entries.filter((item) => item.id !== entry.id);
                                setEntries(newEntries);
                                alert("Data deleted successfully");
                            }).catch((error) => {
                                console.log(error);
                                alert("Error deleting data");
                            })
                        }}>Delete</button>
                    </div>
                ))
            }
        </div>
    )

}

export default ListUser;

