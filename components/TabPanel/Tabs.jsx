import * as React from 'react';
import Box from '@mui/material/Box';
import { default as MuiTabs } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';

import { TabPanel } from '@/components/TabPanel/TabPanel';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { useGetFirebase } from '@/hooks/useGetFirebase';

import { GetClips } from '@/components/TabPanel/tabs/GetClips';
import { SelectUserClips } from '@/components/TabPanel/tabs/SelectUserClips';
import useGetFollowedTwitch from '@/hooks/useGetFollowedTwitch';
import { DisplayError } from '@/components/displayClips/DisplayError';

export const TypeOfClip = {
    TWITCH: 'TWITCH',
    FIREBASE: 'FIREBASE',
}

export const Tabs = () => {
    const [firebaseStreamers] = useGetFirebase();
    const [twitchStreamers] = useGetFollowedTwitch();
    const [value, setValue] = React.useState(0);
    const [clips, setClips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <MuiTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab style={styles.tab} label="From Search" {...a11yProps(0)} />
                    <Tab style={styles.tab} label="From Firebase" {...a11yProps(1)} />
                    <Tab style={styles.tab} label="From Twitch API" {...a11yProps(2)} />
                </MuiTabs>
            </Box>
            <TabPanel value={value} index={0} >
                <div>
                    <SelectUserClips setClips={setClips} setLoading={setLoading} setError={setError} />
                    <DisplayError loading={loading} error={error} clips={clips} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <div>
                    <GetClips
                        clips={clips}
                        loading={loading}
                        error={error}
                        setClips={setClips}
                        setLoading={setLoading}
                        setError={setError}
                        streamers={firebaseStreamers}
                        type={TypeOfClip.FIREBASE}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <GetClips
                        clips={clips}
                        loading={loading}
                        error={error}
                        setClips={setClips}
                        setLoading={setLoading}
                        setError={setError}
                        streamers={twitchStreamers}
                        type={TypeOfClip.TWITCH}
                    />
                </div>
            </TabPanel>
        </Box>
    );
}