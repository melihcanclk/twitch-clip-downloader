import React, { useRef, useState, useEffect } from 'react';
import { Tabs } from '@/components/TabPanel/Tabs';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
const GetClips = () => {
    return (
        <div >
            <h1 id="scroll-to-top">Get Clips</h1>
            <Tabs />
            <ScrollToTopButton />
        </div >
    )
}

export default GetClips