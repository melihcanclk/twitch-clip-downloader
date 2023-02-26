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
                    </div >
                ))

            }
        </div >
    )
}

export default DisplayClips