import React, { useEffect } from 'react';
import { GetClips } from '@/components/getClips/GetClips';
import { TypeOfClip } from '@/components/TypeOfClip';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import { Title } from '@/components/Title';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';

// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const TwitchClipsFromApi = () => {
    const [followedTwitch, setFollowedTwitch] = React.useState([]);
    const [clips, setClips] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false)
    const [day, setDay] = React.useState(6);
    const [numberOfClips, setNumberOfClips] = React.useState(20);

    const sortFollowedTwitch = (followedTwitch) => {
        return [...followedTwitch].sort((a, b) => {
            if (a.to_login > b.to_login) {
                return 1;
            }
            if (a.to_login < b.to_login) {
                return -1;
            }
            return 0;
        })
    }

    useEffect(() => {
        // get followed users from twitch api
        async function getFollowedTwitch() {
            const userID = await convertUserNameToID('eldress__');
            let followedTwitch = []
            let response = await fetchData(
                `https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=100`
            )
            followedTwitch = [...followedTwitch, ...response.data]
            while (response.pagination.cursor) {
                response = await fetchData(
                    `https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=100&after=${response.pagination.cursor}`
                )
                followedTwitch = [...followedTwitch, ...response.data]
            }
            setFollowedTwitch(sortFollowedTwitch(followedTwitch));
        }
        getFollowedTwitch();
    }, [])

    return (
        <ScrollToTopComponent        >
            <Title title={"Search User Clips from Twitch API"}
                streamers={followedTwitch}
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
                streamers={followedTwitch}
                type={TypeOfClip.TWITCH}
            />
        </ScrollToTopComponent >
    )
}

export default TwitchClipsFromApi
