import React, { useState, useEffect } from 'react';
import { styles } from '@/styles/styles';
import { ScrollToTopComponent } from '@/components/ScrollToTopComponent';

export const node_env = process.env.NODE_ENV;
export const domain = node_env === 'development' ? 'https://localhost:3000' : 'https://twitch-clip-downloader-dev.vercel.app/';

const Home = () => {

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
