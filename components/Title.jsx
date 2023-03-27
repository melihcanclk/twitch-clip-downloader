import React from 'react'
import NativeSelect from '@mui/material/NativeSelect';
import { styles } from '@/styles/styles';

export const Title = ({ title, streamers, setDay, setNumberOfClips }) => {

    return (

        <div>
            <div style={{
                padding: '10px 0'
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <NativeSelect
                        onChange={(e) => setDay(parseInt(e.target.value))}
                        name="type"
                        inputProps={{ 'aria-label': 'type' }}
                    >
                        <option value={3}>3 Days</option>
                        <option value={4}>4 Days</option>
                        <option value={7}>1 Week</option>
                    </NativeSelect>
                    <div style={{
                        padding: '0 30px'
                    }}>
                        <h1 className="spinner-container">{title}</h1>
                    </div>
                    <NativeSelect
                        onChange={(e) => setNumberOfClips(parseInt(e.target.value))}
                        name="type"
                        inputProps={{ 'aria-label': 'type' }}
                    >
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                    </NativeSelect>
                </div>

                {
                    streamers &&
                    <p style={{ ...styles.searchComponent, fontSize: '1.5rem' }}>
                        Number of streamers : {streamers.length}
                    </p>
                }
            </div>
        </div >
    )
}