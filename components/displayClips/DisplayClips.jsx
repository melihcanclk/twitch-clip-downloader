import React from 'react'
import { styles } from '@/styles/styles'
import { downloadClips } from '@/components/twitch/downloadClips'
import { domain } from '@/pages/index'

const DisplayClips = ({ clips }) => {
    console.log({ domain })
    return (
        <div>
            {
                clips.map((clip, index) => (
                    <div key={index} style={{ margin: '1rem' }} >
                        <div style={styles.center} >
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${clip.id}&muted=false&parent=${domain}`}
                                height="720"
                                width="1280"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        <div style={styles.center}>
                            <p>{clip.title}</p>3
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