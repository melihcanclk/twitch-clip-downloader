import React from 'react'
import { styles } from '@/styles/styles'

const DisplayClips = ({ clips }) => {
    return (
        <div>
            {
                clips.map((clip, index) => (
                    <div key={index} style={{ margin: '1rem' }} >
                        <div style={{ width: '100%', ...styles.center }} >
                            <img src={clip.thumbnail_url} alt={clip.title} />
                        </div>
                        <a style={styles.center} href={`https://clips.twitch.tv/${clip.id}`} target="_blank" rel="noreferrer">
                            <p >{clip.title}</p>
                        </a>
                    </div>
                ))

            }
        </div>
    )
}

export default DisplayClips