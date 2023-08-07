import DisplayClipsWrapper from '@/components/displayClips/DisplayClipsWrapper';
import { useEffect, useState } from 'react';


// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const TwitchClipsFromApi = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        // get user info from local storage
        const userLocal = JSON.parse(localStorage.getItem('user'))
        setUser(userLocal)
    }, [])

    return (
        <DisplayClipsWrapper
            title={"Search User Clips from Following"}
            url={'https://api.twitch.tv/helix/channels/followed'}
            user_id_parameter={'user_id'}
            username={user.username}
        />
    )
}

export default TwitchClipsFromApi
