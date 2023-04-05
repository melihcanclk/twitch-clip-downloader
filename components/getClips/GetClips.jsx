import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { TabPanel } from '@/components/TabPanel/TabPanel';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import { TypeOfClip } from '@/components/TypeOfClip';
import { DisplayError } from '@/components/displayClips/DisplayError';
import NativeSelect from '@mui/material/NativeSelect';

export const GetClips = ({ clips, loading, error, day, numberOfClips, setClips, setLoading, setError, streamers, type }) => {
    // get users from firebase
    const [value, setValue] = React.useState(0);

    async function getClips() {
        setLoading(true);
        setError(false);
        // hold streamers in buffer with limit of 20
        const buffer = [];
        for (let i = 0; i < streamers.length; i++) {
            if (buffer.length < 20) {
                buffer.push(streamers[i]);
            } else {
                // get clips for each streamer in buffer
                for (let j = 0; j < buffer.length; j++) {
                    const userID = await convertUserNameToID(type === TypeOfClip.FIREBASE ? buffer[j].username : buffer[j].to_name);
                    const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
                    const game_id = game.data[0].id;
                    const today = new Date();
                    const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
                    const dayBeforeISO = dayBefore.toISOString();
                    // TODO : add pagination
                    try {
                        const clipArray = await fetchData(`https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${dayBeforeISO}`);
                        // filter clips that are not from valorant
                        const filteredClips = clipArray.data.filter(clip => clip.game_id === game_id);
                        if (clipArray.data.length > 0) {
                            setClips(prevState => [...prevState, ...filteredClips]);
                        }
                        setLoading(false);
                    }
                    catch (err) {
                        setError(true);
                    }
                }
                // empty buffer
                buffer.length = 0;
            }
        }

    }

    // when numberofclips or day changes, get clips
    useEffect(() => {
        setClips([]);
        if (streamers.length > 0) {
            getClips();
        }
    }, [numberOfClips, day])

    useEffect(() => {
        // when value changes, get clips using entry username
        if (streamers.length > 0) {
            getClips();
        }
    }, [streamers, day, numberOfClips])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{
            width: '100%',
        }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            <DisplayError loading={loading} error={error} clips={clips} />

        </Box>
    )
}
