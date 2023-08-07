import React from 'react'
import { useEffect, useState } from 'react';
import { convertUserNameToID } from '@/components/twitch/convertUsernameToID';
import fetchData from '@/components/twitch/fetch';
import { TypeOfClip } from '@/components/TypeOfClip';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import { Title } from '@/components/Title';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { GetClips } from '@/components/getClips/GetClips';


const DisplayClipsWrapper = ({ url, user_id_parameter, title, username }) => {
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
            let userID = await convertUserNameToID(username);
            if (user_id_parameter !== 'from_id') {
                const user = localStorage.getItem('user');
                const userJSON = JSON.parse(user);
                userID = userJSON.id;
            }
            let followedTwitch = []
            let response = await fetchData(
                `${url}?${user_id_parameter}=${userID}&first=100`
            )
            followedTwitch = [...followedTwitch, response.data]

            while (response.pagination.cursor) {
                response = await fetchData(
                    `${url}?${user_id_parameter}=${userID}&first=100&after=${response.pagination.cursor}`
                )
                followedTwitch = [...followedTwitch, response.data]
            }
            setFollowedTwitch(followedTwitch);
        }
        getFollowedTwitch();
    }, [])


    return (
        <ScrollToTopComponent>
            <Title title={title}
                streamers={followedTwitch}
                clips={clips}
                numberOfClips={numberOfClips}
            />
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
                type={user_id_parameter === 'from_id' ? TypeOfClip.TWITCH : TypeOfClip.FOLLOWING}
            />
        </ScrollToTopComponent >
    )
}

export default DisplayClipsWrapper