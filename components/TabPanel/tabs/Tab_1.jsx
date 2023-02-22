import React from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import { styles } from '@/styles/styles';
import { games } from '@/components/twitch/games';

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
                        console.log(clips)
                        setClips(clips.data.filter(clip => clip.game_id === games[0].id));
                    }}
                >Insert</button>
            </div>
        </div>
    )
}