import React from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import { styles } from '@/styles/styles';

export const SelectUserClips = ({ setClips, setLoading, setError }) => {
    const usernameRef = React.useRef();

    const clearClips = () => {
        setClips([]);
    }

    const onSubmitSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const username = usernameRef.current.value;
        const userID = await convertUserNameToID(username);
        const today = new Date();
        const oneWeekBeforeISO = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();

        fetchData(
            `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=40&started_at=${oneWeekBeforeISO}`
        ).then(clips => {
            setClips(clips.data);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div style={styles.btnContainer}>
            <form onSubmit={onSubmitSearch}
                style={styles.form}
            >
                <input style={styles.input} type="text" ref={usernameRef} placeholder="Enter username" />
                <div>
                    <button style={styles.btn} type="submit">Search Clip</button>
                    <button style={styles.btn} onClick={clearClips} type="reset">Reset</button>
                </div>
            </form>
        </div>
    )
}