import React, { useEffect } from 'react'

const useGetAccessToken = () => {

    const [accessToken, setAccessToken] = React.useState(null);

    useEffect(() => {
        let access_token = localStorage.getItem('access_token');
        if (access_token !== null) {
            setAccessToken(access_token);
        } else {
            // get access token from url hash
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.substring(1));
            access_token = params.get('access_token');
            if (access_token !== null) {
                localStorage.setItem('access_token', access_token);
                setAccessToken(access_token);
            }
        }
    }, [])

    return [accessToken]
}

export default useGetAccessToken;