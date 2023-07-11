import React from 'react'
import { styles } from '@/styles/styles'
import { downloadClips } from '@/components/twitch/downloadClips'
import { domain, node_env } from '@/pages/index'
import { Grid, Box } from '@mui/material'
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StreamerItem = ({ clip, index }) => {
    return (
        <Item>{
            // streamer name, clip title, clip url, clip thumbnail
            <div key={index} style={{ margin: '1rem' }} >
                <div style={styles.center} >
                    <a href={
                        clip.url
                    }
                        target="_blank"
                    >
                        <img
                            src={clip.thumbnail_url}
                            alt={clip.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </a>
                </div>
                <div style={styles.center}>
                    <p>{clip.broadcaster_name}</p>
                </div>
                <div style={styles.center}>
                    <p>{clip.title}</p>
                </div>

                <div style={styles.center}>
                    <p>Number of views: {clip.view_count}</p>
                </div>
                <div>
                    <>Created at: {
                        // convert to local time with turkey timezone
                        new Date(clip.created_at).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
                    } </>
                </div>
                <div style={styles.center}>
                    <button style={styles.btn} onClick={() => {
                        navigator.clipboard.writeText(`https://clips.twitch.tv/${clip.id}`).then(() => {
                            alert('Copied to clipboard')
                        })
                    }}>Copy link</button>
                    <button style={styles.btn} onClick={() => downloadClips(clip)}>Download</button>
                </div>
            </div >
        }</Item>
    )
}

const DisplayClips = ({ clips }) => {
    // const parentDomain = node_env === 'development' ? 'localhost' : domain.replace('https://', '').slice(0, -1)
    return (
        < div >
            {
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent={"center"} spacing={{ xs: 2, md: 3 }} >
                        {
                            // for each streamer, display clips
                            Object.keys(clips).map((streamer) => {
                                return (
                                    clips[streamer].map((clip, index) => {
                                        return (
                                            <Grid item xs={12} md={12} key={index}>
                                                <StreamerItem clip={clip} index={index} />
                                            </Grid>
                                        )
                                    })
                                )
                            }
                            )

                        }
                    </Grid>
                </Box>

            }
        </div >
    )
}

export default DisplayClips