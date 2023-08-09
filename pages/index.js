import React, { useState, useEffect } from 'react';
import { styles } from '@/styles/styles';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';
import useGetAccessToken from '@/hooks/useGetAccessToken';

export const node_env = process.env.NODE_ENV;
export const domain = node_env === 'development' ? 'https://localhost:3000' : 'https://twitch-clip-downloader-dev.vercel.app/';

const Home = () => {

  useEffect(() => {
    // get user info from twitch api using claims
    async function getUserInfo() {

      // get access token
      const access_token = localStorage.getItem('access_token')
      if (!access_token) return;
      
      const response = await fetch("https://id.twitch.tv/oauth2/userinfo", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      const resp = await response.json()

      // get user from id
      const response2 = await fetch(`https://api.twitch.tv/helix/users?id=${resp.sub}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID
        }
      })

      const json2 = await response2.json()
      localStorage.setItem('user', JSON.stringify(
        {
          id: json2.data[0].id,
          username: json2.data[0].login,
          display_name: json2.data[0].display_name,
          profile_image_url: json2.data[0].profile_image_url,
          email: resp.email,
        }
      ))
    }
    getUserInfo();

  }, [])

  return (
    <ScrollToTopComponent title={'Home'}>
      <div style={styles.body}>
        {/* <a style={styles.btnInner} href={`/addUser`}>Add User</a> */}
        <a style={styles.btnInner} href={`/getClips`}>Get Clips</a>
      </div>
    </ScrollToTopComponent>
  )
}

export default Home
