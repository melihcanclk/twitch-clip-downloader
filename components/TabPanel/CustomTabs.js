import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styles } from '@/styles/styles';

import { TabPanel } from '@/components/TabPanel/TabPanel';
import { a11yProps } from '@/components/TabPanel/a11yProps';
import { Tab_0 } from '@/components/TabPanel/tabs/Tab_0';
import { Tab_1 } from '@/components/TabPanel/tabs/Tab_1';

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
                    <Tab style={styles.tab} label="From Firebase" {...a11yProps(0)} />
                    {/* <Tab style={styles.tab} label="From Search" {...a11yProps(1)} /> */}
                </Tabs>
            </Box>
            {/* <TabPanel value={value} index={0} >
                <div>
                    <Tab_0 />
                </div>
            </TabPanel> */}
            <TabPanel value={value} index={0} >
                <div>
                    <Tab_1 setClips={setClips} />
                    <div>
                        {clips.map((clip, index) => {
                            return (
                                <div key={index}>
                                    <img src={clip.thumbnail_url} />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <a href={`${clip.url}`}>{clip.title}</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </TabPanel>
        </Box>
    );
}