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
                `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&started_at=${oneWeekBeforeISO}`
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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {

                        streamers.map((entry, index) => (
                            <Tab style={styles.tab} label={entry.username} {...a11yProps(index)} />
                        ))

                    }
                </Tabs>
            </Box>
            {
                streamers.map((entry, index) => (
                    <TabPanel value={value} index={index}>
                        {
                            clips.map((clip, index) => (
                                <div key={index}>
                                    <div >
                                        <a href={`https://clips.twitch.tv/${clip.id}`} target="_blank" rel="noreferrer">
                                            <img src={clip.thumbnail_url} alt={clip.title} />
                                            <p style={styles.center}>{clip.title}</p>
                                        </a>
                                    </div>
                                </div>
                            ))

                        }
                    </TabPanel>
                ))
            }
        </Box>
    )
}