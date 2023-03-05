import React, { useEffect } from 'react'
import fetchData from '@/components/twitch/fetch';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';

export const useGetFollowedTwitch = () => {

    const [followedTwitch, setFollowedTwitch] = React.useState([]);

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
            setFollowedTwitch(sortFollowedTwitch(followedTwitch));
        }
        getFollowedTwitch();
    }, [])

    return [followedTwitch];

}
