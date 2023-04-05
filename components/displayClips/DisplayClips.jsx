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


const DisplayClips = ({ clips }) => {
    // const parentDomain = node_env === 'development' ? 'localhost' : domain.replace('https://', '').slice(0, -1)
    return (
        < div >
            {
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {clips.map((clip, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
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
                                            <p>{clip.title}</p>
                                        </div>
                                        <div style={styles.center}>
                                            <p>Number of views: {clip.view_count}</p>
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
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            }
        </div >
    )
}

export default DisplayClips