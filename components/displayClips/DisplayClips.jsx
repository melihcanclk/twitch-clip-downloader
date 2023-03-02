import React from 'react'
import { styles } from '@/styles/styles'
import { downloadClips } from '@/components/twitch/downloadClips'

const DisplayClips = ({ clips }) => {
    return (
        <div>
            {
                clips.map((clip, index) => (
                    <div key={index} style={{ margin: '1rem' }} >
                        <a style={styles.center} href={`https://clips.twitch.tv/${clip.id}`} target="_blank" rel="noreferrer">
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${clip.id}&muted=false&parent=localhost`}
                                height="400"
                                width="600"
                                allowFullScreen
                            >
                            </iframe>
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
                            <button style={styles.btn} onClick={() => downloadClips(clip)}>Download</button>
                        </div>
                    </div >
                ))

            }
        </div >
    )
}

export default DisplayClips