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
    const [numberOfClips, setNumberOfClips] = React.useState(0);

    useEffect(() => {
        // get followed users from twitch api
        async function getFollowedTwitch() {
            const userID = await convertUserNameToID('eldress__');
            let followedTwitch = []
            let response = await fetchData(
                `https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=100`
            )
            followedTwitch = [...followedTwitch, response.data]

            while (response.pagination.cursor) {
                response = await fetchData(
                    `https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=100&after=${response.pagination.cursor}`
                )
                followedTwitch = [...followedTwitch, response.data]
            }
            setFollowedTwitch(followedTwitch);
        }
        getFollowedTwitch();
    }, [])

    return (
        <ScrollToTopComponent        >
            <Title title={"Search User Clips from Twitch API"}
                streamers={followedTwitch}
                clips={clips}
                numberOfClips={numberOfClips}
            />
            <GetClips
                clips={clips}
                numberOfClips={numberOfClips}
                setClips={setClips}
                setNumberOfClips={setNumberOfClips}
                streamers={followedTwitch}
                type={TypeOfClip.TWITCH}
            />
        </ScrollToTopComponent >
    )
}

export default TwitchClipsFromApi
