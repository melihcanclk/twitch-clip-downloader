import React from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import { styles } from '@/styles/styles';

export const SelectUserClips = ({ setClips }) => {
    const usernameRef = React.useRef();

    return (
        <div>
            <div style={styles.btnContainer}>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const username = usernameRef.current.value;
                    const userID = await convertUserNameToID(username);
                    const today = new Date();
                    const oneWeekBeforeISO = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();

                    const clips = await fetchData(
                        `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=40&started_at=${oneWeekBeforeISO}`
                    )
                    setClips(clips.data);
                }}>
                    <input style={styles.input} type="text" ref={usernameRef} placeholder="Enter username" />
                    <button style={styles.btn} type="submit">Search Clip</button>
                </form>

            </div>
        </div>
    )
}