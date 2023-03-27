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

    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            setLoading(true);
            setError(false);
            const userID = await convertUserNameToID(type === TypeOfClip.FIREBASE ? streamers[value].username : streamers[value].to_name);
            const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
            const game_id = game.data[0].id;
            const today = new Date();
            const oneWeekBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
            const oneWeekBeforeISO = oneWeekBefore.toISOString();
            // TODO : add pagination
            fetchData(
                `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=${numberOfClips}&started_at=${oneWeekBeforeISO}`
            ).then(res => {
                setClips(res.data.filter(clip => clip.game_id === game_id));
                setLoading(false);
            }).catch(err => {
                setError(true);
                setLoading(false);
            })
        }
        if (streamers.length > 0) {
            getClips();
        }
    }, [value, streamers, day, numberOfClips])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: '1100px' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                textColor="black"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#000"
                    }
                }}
                scrollButtons="auto"
            >
                {
                    streamers.map((entry, index) => (
                        <Tab key={index} style={styles.tab} label={type === TypeOfClip.FIREBASE ? entry.username : entry.to_name} {...a11yProps(index)} />
                    ))
                }
            </Tabs>
            {
                streamers.map((streamer, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        <DisplayError loading={loading} error={error} clips={clips} />
                    </TabPanel>
                ))
            }
        </Box>
    )
}
