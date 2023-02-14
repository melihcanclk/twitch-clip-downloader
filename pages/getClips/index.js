import React, { useRef, useState, useEffect } from 'react';
import { styles } from '@/styles/styles';
import fetchData from '@/components/fetchTwitch/fetch';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
const GetClips = () => {
    const usernameRef = useRef();
    const [accessToken, setAccessToken] = useState(null);
    // get from local storage
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAccessToken(accessToken);
        }
    }, [])

    return (
        <div>
            <h1>Get Clips</h1>
            <div>
                <div style={styles.btnContainer}>
                    <input style={styles.input} ref={usernameRef} type="text" placeholder="Username" />
                    <button style={styles.btn}
                        onClick={async () => {
                            // get twitch clips using username from helix twitch api
                            // https://dev.twitch.tv/docs/api/reference#get-clips
                            const x = await fetchData(
                                `https://api.twitch.tv/helix/clips?broadcaster_id=${184227837}`,
                                {
                                    method: 'GET'
                                }
                            )
                            console.log(x)
                        }}
                    >Insert</button>
                </div>
            </div>
        </div >
    )
}

export default GetClips