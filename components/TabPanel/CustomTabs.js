import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';

import { TabPanel } from '@/components/TabPanel/TabPanel';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { useGetFirebase } from '@/hooks/useGetFirebase';

import { GetClipsFromFirebase } from '@/components/TabPanel/tabs/GetUserClipsFromFirebase';
import { SelectUserClips } from '@/components/TabPanel/tabs/SelectUserClips';
import useGetFollowedTwitch from '@/hooks/useGetFollowedTwitch';
import DisplayClips from './tabs/DisplayClips';

export const TypeOfClip = {
    TWITCH: 'TWITCH',
    FIREBASE: 'FIREBASE',
}

export default function CustomTabs() {
    const [firebaseStreamers] = useGetFirebase();
    const [twitchStreamers] = useGetFollowedTwitch();
    const [value, setValue] = React.useState(0);
    const [clips, setClips] = React.useState([]);

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
                    <Tab style={styles.tab} label="From Search" {...a11yProps(0)} />
                    {/* <Tab style={styles.tab} label="From Firebase" {...a11yProps(1)} /> */}
                    {/* <Tab style={styles.tab} label="From Twitch API" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <div>
                    <SelectUserClips setClips={setClips} />
                    <DisplayClips clips={clips} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <div>
                    <GetClipsFromFirebase streamers={firebaseStreamers} type={TypeOfClip.FIREBASE} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} >
                <div>
                    <GetClipsFromFirebase streamers={twitchStreamers} type={TypeOfClip.TWITCH} />
                </div>
            </TabPanel>
        </Box>
    );
}