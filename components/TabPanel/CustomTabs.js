import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';

import { TabPanel } from '@/components/TabPanel/TabPanel';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { GetUserClipsFromFirebase } from '@/components/TabPanel/tabs/GetUserClipsFromFirebase';
import { SelectUserClips } from '@/components/TabPanel/tabs/SelectUserClips';

export default function CustomTabs() {
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
                    <Tab style={styles.tab} label="From Firebase" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <div>
                    <SelectUserClips setClips={setClips} />
                    <div>
                        {clips.map((clip, index) => {
                            return (
                                <div key={index}>
                                    <img src={clip.thumbnail_url} />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <a target={`_blank`} href={`${clip.url}`}>{clip.title}</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <div>
                    <GetUserClipsFromFirebase />
                </div>
            </TabPanel>
        </Box>
    );
}