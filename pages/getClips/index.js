import { useRef } from 'react';

const GetClips = () => {
    const usernameRef = useRef();
    const styles = {
        input: {
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        btnContainer: {
            margin: "20px"
        },
        btn: {
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f44336",
            color: "white"
        },
        connectTwitch: {
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#6441a5",
            color: "white",
            textDecoration: "none",
            textAlign: "center"
        }
    }
    return (
        <div>
            <h1>Get Clips</h1>
            <div style={styles.connectTwitch}>
                <a href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=https://localhost:3000/getClips&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`}>Connect with Twitch</a>
            </div>
            <div style={styles.btnContainer}>
                <input style={styles.input} ref={usernameRef} type="text" placeholder="Username" />
                <button style={styles.btn}
                    onClick={() => {
                        // get twitch clips using username from helix twitch api
                        fetch(`https://id.twitch.tv/oauth2/token`, {
                            method: "POST"
                        }).then(res => res.json()).then(data => {
                        })
                        // fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${usernameRef.current.value}`, {
                        //     method: "GET",
                        //     headers: {
                        //         "Client-ID": process.env.TWITCH_CLIENT_ID,
                        //     }
                        // })
                    }}
                >Insert</button>
            </div>
        </div >
    )
}

export default GetClips