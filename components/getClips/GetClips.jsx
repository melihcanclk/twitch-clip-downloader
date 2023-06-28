import React, { useEffect } from 'react';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import { TypeOfClip } from '@/components/TypeOfClip';
import { DisplayError } from '@/components/displayClips/DisplayError';

export const GetClips = ({ clips, day, numberOfClips, setClips, streamers, type }) => {
    // get users from firebase

    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            // get clips for each streamer in buffer
            for (let j = 0; j < streamers.length; j++) {
                for (let k = 0; k < streamers[j].length; k++) {
                    const username = (type === TypeOfClip.FIREBASE ? streamers[j][k].username : streamers[j][k].to_name);
                    const userID = await convertUserNameToID(username);
                    const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
                    const game_id = game.data[0].id;
                    const today = new Date();
                    const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
                    const dayBeforeISO = dayBefore.toISOString();
                    // TODO : add pagination
                    try {
                        const { data } = await fetchData(`https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${dayBeforeISO}`);
                        // filter clips that are not from valorant
                        if (data.length > 0) {
                            const filteredClips = data.filter(clip => clip.game_id === game_id).slice(0, 3);
                            // setClips with username as key and clips as value
                            setClips((prev) => ({ ...prev, [username]: filteredClips }));
                        }
                    }
                    catch (err) {
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
            <DisplayError clips={clips} />
        </Box>
    )
}
