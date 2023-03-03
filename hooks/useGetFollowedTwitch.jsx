import React, { useEffect } from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';

export const useGetFollowedTwitch = () => {

    const [followedTwitch, setFollowedTwitch] = React.useState([]);

    useEffect(() => {
        // get followed users from twitch api
        async function getFollowedTwitch() {
            const userID = await convertUserNameToID('femespor');
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
            setFollowedTwitch([...followedTwitch]);
        }
        getFollowedTwitch();
    }, [])

    return [followedTwitch];

}
