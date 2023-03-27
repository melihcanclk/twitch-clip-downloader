import React from 'react';
import { SelectUserClips } from '@/components/getClips/SelectUserClips';
import { DisplayError } from '@/components/displayClips/DisplayError';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import { Title } from '@/components/Title';

// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const SearchClips = () => {
    const [clips, setClips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [day, setDay] = React.useState(3);
    const [numberOfClips, setNumberOfClips] = React.useState(20);

    return (
        <ScrollToTopComponent>
            <Title title={"Search By Name"} setDay={setDay} setNumberOfClips={setNumberOfClips} />
            <SelectUserClips day={day} setClips={setClips} numberOfClips={numberOfClips} setLoading={setLoading} setError={setError} />
            <DisplayError loading={loading} error={error} clips={clips} />
        </ScrollToTopComponent >
    )
}

export default SearchClips