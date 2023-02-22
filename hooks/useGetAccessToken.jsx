import React, { useEffect } from 'react'

const useGetAccessToken = () => {

    const [accessToken, setAccessToken] = React.useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAccessToken(accessToken);
        }
    }, [])

    return (
        accessToken
    )
}

export default useGetAccessToken;