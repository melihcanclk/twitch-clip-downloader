import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { TabPanel } from '@/components/TabPanel/TabPanel';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';
import DisplayClips from './DisplayClips';
import { TypeOfClip } from '../CustomTabs';

export const GetClipsFromFirebase = ({ streamers, type }) => {
    // get users from firebase
    const [value, setValue] = React.useState(0);
    const [clips, setClips] = React.useState([]);

    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            const userID = await convertUserNameToID(type === TypeOfClip.FIREBASE ? streamers[value].username : streamers[value].to_name);
            const game = await fetchData(`https://api.twitch.tv/helix/games?name=Valorant`)
            const game_id = game.data[0].id;
            const today = new Date();
            const oneWeekBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            const oneWeekBeforeISO = oneWeekBefore.toISOString();
            const clips = await fetchData(
                `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=40&started_at=${oneWeekBeforeISO}`
            )
            setClips(clips.data.filter(clip => clip.game_id === game_id));
        }
        if (streamers.length > 0) {
            getClips();
        }
    }, [value, streamers])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: '800px' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
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
                        <DisplayClips clips={clips} />
                    </TabPanel>
                ))
            }
        </Box>
    )
}