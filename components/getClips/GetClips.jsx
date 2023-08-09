import React, { useEffect, useState } from 'react';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import { TypeOfClip } from '@/components/TypeOfClip';
import DisplayClips from '../displayClips/DisplayClips';

export const GetClips = ({ clips, setClips, streamers, type, numberOfClips, setNumberOfClips }) => {


    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            // get clips for each streamer in buffer
            for (let j = 0; j < streamers.length; j++) {
                for (let k = 0; k < streamers[j].length; k++) {
                    let username = '';
                    if (type === TypeOfClip.FIREBASE) {
                        username = streamers[j][k].username;
                    } else if (type === TypeOfClip.TWITCH) {
                        username = streamers[j][k].to_login;
                    } else { // following
                        username = streamers[j][k].broadcaster_login;
                    }
                    const userID = await convertUserNameToID(username);
                    const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
                    const game_id = game.data[0].id;
                    const today = new Date();
                    // same hour yesterday
                    const dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, today.getHours(), today.getMinutes(), today.getSeconds());
                    const dayBeforeISO = dayBefore.toISOString();
                    // TODO : add pagination
                    try {
                        const { data } = await fetchData(`https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&started_at=${dayBeforeISO}`);
                        // filter clips that are not from valorant
                        if (data.length > 0) {
                            const filteredClips = data.filter(clip => clip.game_id === game_id);
                            setNumberOfClips((prev) => prev + filteredClips.length);

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
        getClips();
    }, [streamers])

    useEffect(() => {
        // when number of clips changes, slice clips
        const slicedClips = Object.keys(clips).reduce((acc, key) => {
            acc[key] = clips[key].slice(0, numberOfClips);
            return acc;
        }, {});
        setClips(slicedClips);
    }, [numberOfClips])


    return (
        <Box sx={{
            width: '100%',
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            <DisplayClips clips={clips} />
        </Box>
    )
}
