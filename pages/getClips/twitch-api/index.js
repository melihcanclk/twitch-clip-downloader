import React from 'react';
import { useGetFollowedTwitch } from '@/hooks/useGetFollowedTwitch';
import { GetClips } from '@/components/getClips/GetClips';
import { TypeOfClip } from '@/components/TypeOfClip';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import { Title } from '@/components/Title';
// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const TwitchClipsFromApi = () => {
    const [twitchStreamers] = useGetFollowedTwitch();
    const [clips, setClips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false)
    const [day, setDay] = React.useState(6);
    const [numberOfClips, setNumberOfClips] = React.useState(20);


    return (
        <ScrollToTopComponent        >
            <Title title={"Search User Clips from Twitch API"}
                streamers={twitchStreamers}
                day={day}
                setDay={setDay}
                clips={clips}
                numberOfClips={numberOfClips}
                setNumberOfClips={setNumberOfClips}
            />
            <GetClips
                clips={clips}
                day={day}
                numberOfClips={numberOfClips}
                loading={loading}
                error={error}
                setClips={setClips}
                setLoading={setLoading}
                setError={setError}
                streamers={twitchStreamers}
                type={TypeOfClip.TWITCH}
            />
        </ScrollToTopComponent >
    )
}

export default TwitchClipsFromApi
