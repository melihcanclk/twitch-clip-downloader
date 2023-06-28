import React from 'react';
import DisplayClips from '@/components/displayClips/DisplayClips';

export const DisplayError = ({ clips, value, loading, error }) => {
    let clipLength = Object.keys(clips).map((streamer) => clips[streamer].length).reduce((a, b) => a + b, 0);
    console.log(clipLength)
    return (
        clipLength > 0 &&
            <DisplayClips clips={clips} value={value} loading={loading} />
    );
}