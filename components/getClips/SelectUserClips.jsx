import React, { useEffect } from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import { styles } from '@/styles/styles';

export const SelectUserClips = ({ day, numberOfClips, setClips, setLoading, setError }) => {
    const usernameRef = React.useRef();

    const clearClips = () => {
        setClips([]);
    }

    // async get clips from twitch api
    const getClips = async (username) => {
        setLoading(true);
        const userID = await convertUserNameToID(username);
        const today = new Date();
        const oneWeekBeforeISO = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day).toISOString();

        fetchData(
            `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${oneWeekBeforeISO}`
        ).then(clips => {
            setClips(clips.data);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        // when value changes, get clips using entry username
        const username = usernameRef.current.value;
        if (username)
            getClips(username);

    }, [day, numberOfClips])

    const onSubmitSearch = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        if (username) {
            getClips(username);
        }
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