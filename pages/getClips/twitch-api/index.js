import DisplayClipsWrapper from '@/components/displayClips/DisplayClipsWrapper';


// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const TwitchClipsFromApi = () => {

    return (
        <DisplayClipsWrapper
            title={"Search User Clips from Twitch API"}
            url={"https://api.twitch.tv/helix/users/follows"}
            user_id_parameter={'from_id'}
            username={'eldress__'}
        />
    )
}

export default TwitchClipsFromApi
