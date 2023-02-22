import React from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import { styles } from '@/styles/styles';

export const Tab_1 = ({ setClips }) => {
    const usernameRef = React.useRef();

    return (
        <div>
            <div style={styles.btnContainer}>
                <input style={styles.input} ref={usernameRef} type="text" placeholder="Username" />
                <button style={styles.btn}
                    onClick={async () => {
                        // get twitch clips using username from helix twitch api
                        // https://dev.twitch.tv/docs/api/reference#get-clips
                        const username = usernameRef.current.value;
                        const userID = await convertUserNameToID(username);

                        const clips = await fetchData(
                            `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}`
                        )
                        setClips(clips.data);
                    }}
                >Insert</button>
            </div>
        </div>
    )
}