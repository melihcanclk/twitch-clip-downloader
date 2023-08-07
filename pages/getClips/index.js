import React from 'react';
import { styles } from '@/styles/styles';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
const GetClipsIndex = () => {
    return (
        <ScrollToTopComponent title={'Get Clips'}>
            <div style={styles.body} className='spinner-container height-100' >
                <a style={styles.btnInner} href={`/getClips/search`}>Search</a>
                {/* <a style={styles.btnInner} href={`/getClips/firebase`}>Firebase</a> */}
                <a style={styles.btnInner} href={`/getClips/twitch-api`}>Twitch API</a>
                <a style={styles.btnInner} href={`/getClips/following`}>Following</a>
            </div>
        </ScrollToTopComponent>
    )
}

export default GetClipsIndex