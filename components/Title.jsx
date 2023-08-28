import React from 'react'
import NativeSelect from '@mui/material/NativeSelect';
import { styles } from '@/styles/styles';

export const Title = ({ title, streamers, clips, numberOfClips }) => {

    return (

        <div>
            <div style={{
                padding: '10px 0'
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 30px'
                }}>
                    {/* <NativeSelect
                        value={day}
                        onChange={(e) => setDay(parseInt(e.target.value))}
                        name="type"
                        inputProps={{ 'aria-label': 'type' }}
                    >
                        <option value={3}>3 Days</option>
                        <option value={4}>4 Days</option>
                        <option value={7}>1 Week</option>
                    </NativeSelect> */}
                    <div style={{
                        width: '100%',
                    }}>
                        <h1 style={
                            styles.center
                        }>{title}</h1>
                    </div>
                    {/* <NativeSelect
                        value={numberOfClips}
                        onChange={(e) => setNumberOfClips(parseInt(e.target.value))}
                        name="type"
                        inputProps={{ 'aria-label': 'type' }}
                    >
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </NativeSelect> */}
                </div>

                {
                    streamers &&
                    <p style={{ ...styles.searchComponent, fontSize: '1.5rem' }}>
                        Number of streamers : {Object.keys(streamers).map((streamer) => streamers[streamer].length).reduce((a, b) => a + b, 0)}
                    </p>
                }
                {
                    numberOfClips &&
                    <p style={{ ...styles.searchComponent, fontSize: '1.5rem' }}>
                        Number of clips : {Object.keys(clips).map((streamer) => clips[streamer].length).reduce((a, b) => a + b, 0)}
                    </p>
                }
            </div>
        </div >
    )
}