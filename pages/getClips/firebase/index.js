import React from 'react';
import { useGetFirebase } from '@/hooks/useGetFirebase';
import { GetClips } from '@/components/getClips/GetClips';
import { TypeOfClip } from '@/components/TypeOfClip';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const FirebaseClips = () => {

    const [firebaseStreamers] = useGetFirebase();
    const [clips, setClips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <ScrollToTopComponent
            title={'Get User Clips From Firebase'}
        >
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
        </ScrollToTopComponent >
    )
}

export default FirebaseClips