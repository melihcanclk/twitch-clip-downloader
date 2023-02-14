import React, { useEffect, useState } from 'react'
import { styles } from '@/styles/styles';
import fetchData from '@/components/fetchTwitch/fetch';

const FollowedUsers = () => {
  const [accessToken, setAccessToken] = useState(null);
  // get from local storage

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [])


  useEffect(() => {
    // fetchData(
    //   `https://api.twitch.tv/helix/users/follows?to_id=184227837`,
    //   {
    //     method: 'GET'
    //   }
    // ).then((res) => {
    //   console.log(res)
    // })
  }, [])


  return (
    <div style={styles.connectTwitch}>

    </div>
  )
}

export default FollowedUsers