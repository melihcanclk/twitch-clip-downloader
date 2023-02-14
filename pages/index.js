import React, { useState, useEffect } from 'react';
import { styles } from '@/styles/styles';

const Home = () => {

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const _accessToken = hash.split('&')[0].split('=')[1];
      setAccessToken(_accessToken);
      localStorage.setItem('accessToken', _accessToken);
      localStorage.setItem('url', window.location.hash);
    }
  }, [])
  return (
    <div style={styles.body}>
      {
        accessToken ? (
          <div style={styles.btnContainer}>
            <a style={styles.btnInner} href={`/addUser`}>Add User</a>
            <a style={styles.btnInner} href={`/getClips`}>Get Clips</a>
            <a style={styles.btnInner} href={`/getFollowedUsers`}>Get Followed Users</a>
          </div>
        ) : (
          <div style={styles.connectTwitch}>
            <a href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=https://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`}>Connect with Twitch</a>
          </div>
        )
      }
    </div>
  )
}

export default Home
