import React, { useEffect } from 'react';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import { TypeOfClip } from '@/components/TypeOfClip';
import { DisplayError } from '@/components/displayClips/DisplayError';

export const GetClips = ({ clips, loading, error, day, numberOfClips, setClips, setLoading, setError, streamers, type }) => {
    // get users from firebase
    const [value, setValue] = React.useState(0);

    async function getClips() {
        setLoading(true);
        setError(false);
        let buffer = [];
        const BUFFER_SIZE = 100;
        // fill buffer with 100 streamers in every iteration
        // and get clips for each streamer
        for (let i = 0; i < streamers.length; i += BUFFER_SIZE) {
            buffer.push(streamers.slice(i, i + BUFFER_SIZE));
        }
        // get clips for each streamer in buffer
        for (let j = 0; j < buffer.length; j++) {
            for (let k = 0; k < buffer[j].length; k++) {
                const userID = await convertUserNameToID(type === TypeOfClip.FIREBASE ? buffer[j][k].username : buffer[j][k].to_name);
                const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
                const game_id = game.data[0].id;
                const today = new Date();
                const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
                const dayBeforeISO = dayBefore.toISOString();
                // TODO : add pagination
                try {
                    const clipArray = await fetchData(`https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${dayBeforeISO}`);
                    // filter clips that are not from valorant
                    if (clipArray.data.length > 0) {
                        const filteredClips = clipArray.data.filter(clip => clip.game_id === game_id);
                        setClips(prevState => [...prevState, ...filteredClips]);
                    }
                    setLoading(false);
                }
                catch (err) {
                    setError(true);
                }
            }
        }
    }

    useEffect(() => {
        // when value changes, get clips using entry username
        if (streamers.length > 0) {
            getClips();
        }
    }, [streamers, day, numberOfClips])

    return (
        <Box sx={{
            width: '100%',
        }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            <DisplayError loading={loading} error={error} clips={clips} />

        </Box>
    )
}
