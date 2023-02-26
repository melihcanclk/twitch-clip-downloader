import React from 'react'
import { styles } from '@/styles/styles'

const DisplayClips = ({ clips }) => {
    return (
        <div>
            {
                clips.map((clip, index) => (
                    <div key={index} style={{ margin: '1rem' }} >
                        <a style={styles.center} href={`https://clips.twitch.tv/${clip.id}`} target="_blank" rel="noreferrer">
                            <img src={clip.thumbnail_url} alt={clip.title} />
                        </a>
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
                            <button style={styles.btn} onClick={() => {
                                // download video clip
                                const a = document.createElement('a');
                                a.href = clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
                                a.download = clip.title;
                                a.click();
                            }}>Download</button>
                        </div>
                    </div >
                ))

            }
        </div >
    )
}

export default DisplayClips