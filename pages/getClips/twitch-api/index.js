import React, { useEffect, useState } from 'react';
import { TypeOfClip } from '@/components/TypeOfClip';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import { Title } from '@/components/Title';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { GetClips } from '@/components/getClips/GetClips';
import { withStyles } from '@mui/material';


// TODO : https://www.reddit.com/r/bash/comments/8aktn4/how_to_download_latest_5_twitch_videos_with/
export const TwitchClipsFromApi = () => {
    const [followedTwitch, setFollowedTwitch] = React.useState([]);
    const [clips, setClips] = React.useState({});
    const [numberOfClips, setNumberOfClips] = React.useState(3);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange = (event) => {
        setNumberOfClips(event.currentTarget.value);
        console.log(event.currentTarget.value)
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
        <ScrollToTopComponent>
            <Title title={"Search User Clips from Twitch API"}
                streamers={followedTwitch}
                clips={clips}
                numberOfClips={numberOfClips}
            />
            {
                // add a component to dropdown 3 or 5 or 10 clips

            }
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                    style={{
                        backgroundColor: '#6441a5',
                        color: 'white',
                        margin: '10px 0px',
                    }}

                >
                    Number Of Clips
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    onChange={handleChange}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}

                >
                    <MenuItem value={3} onClick={handleChange}>3</MenuItem>
                    <MenuItem value={5} onClick={handleChange}>5</MenuItem>
                    <MenuItem value={10} onClick={handleChange}>10</MenuItem>
                </Menu>
            </div>
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
