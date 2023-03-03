import React from 'react';
import { styles } from '@/styles/styles';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
const GetClips = () => {
    return (
        <div >
            <h1 id="scroll-to-top">Get Clips</h1>
            <div style={styles.btnContainer}>
                <a style={styles.btnInner} href={`/getClips/search`}>Search</a>
                <a style={styles.btnInner} href={`/getClips/firebase`}>Firebase</a>
                <a style={styles.btnInner} href={`/getClips/twitch-api`}>Twitch API</a>
            </div>
            <ScrollToTopButton />
        </div >
    )
}

export default GetClips