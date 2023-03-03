import React from 'react';
import { SelectUserClips } from '@/components/getClips/SelectUserClips';
import { DisplayError } from '@/components/displayClips/DisplayError';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const SearchClips = () => {
    const [clips, setClips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <ScrollToTopComponent
            title={'Search User Clips'}
        >
            <SelectUserClips setClips={setClips} setLoading={setLoading} setError={setError} />
            <DisplayError loading={loading} error={error} clips={clips} />
        </ScrollToTopComponent >
    )
}

export default SearchClips