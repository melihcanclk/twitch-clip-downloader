import React, { useEffect } from 'react';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import { TypeOfClip } from '@/components/TypeOfClip';
import { DisplayError } from '@/components/displayClips/DisplayError';

export const GetClips = ({ clips, loading, error, day, numberOfClips, setClips, setLoading, setError, streamers, type }) => {
    // get users from firebase
    const [streamerBuffer, setStreamerBuffer] = React.useState([]);

    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            console.log("getClips")
            const BUFFER_SIZE = 100;
            // set streamerBuffer in chunks of BUFFER_SIZE
            for (let i = 0; i < streamers.length; i += BUFFER_SIZE) {
                setStreamerBuffer((prev) => [...prev, streamers.slice(i, i + BUFFER_SIZE)]);
            }
            console.log({ streamerBuffer })
            // get clips for each streamer in buffer
            for (let j = 0; j < streamerBuffer.length; j++) {
                for (let k = 0; k < streamerBuffer[j].length; k++) {
                    const username = (type === TypeOfClip.FIREBASE ? streamerBuffer[j][k].username : streamerBuffer[j][k].to_name);
                    const userID = await convertUserNameToID(username);
                    const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
                    const game_id = game.data[0].id;
                    const today = new Date();
                    const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
                    const dayBeforeISO = dayBefore.toISOString();
                    // TODO : add pagination
                    try {
                        const { data } = await fetchData(`https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${dayBeforeISO}`);
                        console.log({ data })
                        // filter clips that are not from valorant
                        if (data.length > 0) {
                            const filteredClips = data.filter(clip => clip.game_id === game_id).slice(0, 3);
                            // setClips with username as key and clips as value
                            setClips((prev) => ({ ...prev, [username]: filteredClips }));
                        }
                        setLoading(false);
                    }
                    catch (err) {
                        setError(true);
                        console.log(err);
                    }
                }
            }
        }
        if (streamers.length > 0) {
            getClips();
        }
    }, [streamers])

    return (
        <Box sx={{
            width: '100%',
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            <DisplayError loading={loading} error={error} clips={clips} />
        </Box>
    )
}
