import React, { useRef, useState, useEffect } from 'react';
import { styles } from '@/styles/styles';
import fetchData from '@/components/twitch/fetch';
import convertUserNameToID from '@/components/twitch/convertUsernameToID';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
const GetClips = () => {
    const usernameRef = useRef();

    // get from local storage
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
                            const username = usernameRef.current.value;
                            const userID = await convertUserNameToID(username);

                            const x = await fetchData(
                                `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}`
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