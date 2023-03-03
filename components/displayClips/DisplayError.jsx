import React from 'react';
import DisplayClips from '@/components/displayClips/DisplayClips';

export const DisplayError = ({ clips, loading, error }) => {
    return (
        <div >
            {
                loading ?
                    <div className="spinner-container">
                        <div className="loading-spinner">
                        </div>
                    </div>
                    :
                    (
                        error ?
                            <div
                                className='error-text'
                                style={{
                                    color: 'red',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                Error while loading clips
                            </div>
                            :
                            clips.length > 0 ?
                                <DisplayClips clips={clips} />
                                :
                                <div>No clips found</div>
                    )
            }
        </div>
    )
}