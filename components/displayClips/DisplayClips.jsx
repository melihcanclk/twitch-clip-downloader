import React from 'react'
import { styles } from '@/styles/styles'
import { downloadClips } from '@/components/twitch/downloadClips'
import { domain, node_env } from '@/pages/index'

const DisplayClips = ({ clips }) => {
    // const parentDomain = node_env === 'development' ? 'localhost' : domain.replace('https://', '').slice(0, -1)

    return (
        <div>
            {
                clips.map((clip, index) => (
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
                ))

            }
        </div >
    )
}

export default DisplayClips