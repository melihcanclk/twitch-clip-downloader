import React, { useEffect } from 'react';
import { useGetFirebase } from '@/hooks/useGetFirebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { TabPanel } from '@/components/TabPanel/TabPanel';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { Box } from '@mui/system';

export const GetUserClipsFromFirebase = () => {
    // get users from firebase
    const [streamers] = useGetFirebase();
    const [value, setValue] = React.useState(0);
    const [clips, setClips] = React.useState([]);

    useEffect(() => {
        // when value changes, get clips using entry username
        async function getClips() {
            const userID = await convertUserNameToID(streamers[value].username);
            const today = new Date();
            const oneWeekBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            const oneWeekBeforeISO = oneWeekBefore.toISOString();
            const clips = await fetchData(
                `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=40&started_at=${oneWeekBeforeISO}`
            )
            setClips(clips.data);
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
                        <Tab key={index} style={styles.tab} label={entry.username} {...a11yProps(index)} />
                    ))
                }
            </Tabs>
            {
                streamers.map((streamer, index) => (
                    <TabPanel value={value} index={index}>
                        {
                            clips.map((clip, index) => (
                                <div key={index} style={{ margin: '1rem' }} >
                                    <div style={{ width: '100%', ...styles.center }} >
                                        <img src={clip.thumbnail_url} alt={clip.title} />
                                    </div>
                                    <a style={styles.center} href={`https://clips.twitch.tv/${clip.id}`} target="_blank" rel="noreferrer">
                                        <p >{clip.title}</p>
                                    </a>
                                </div>
                            ))

                        }
                    </TabPanel>
                ))
            }
        </Box>
    )
}