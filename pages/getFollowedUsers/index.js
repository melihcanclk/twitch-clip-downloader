import React, { useEffect, useState } from 'react'
import { styles } from '@/styles/styles';
import fetchData from '@/components/fetchTwitch/fetch';
import useGetAccessToken from '@/hooks/useGetAccessToken';

const FollowedUsers = () => {
  return (
    <div>
      <h1>Followed Users</h1>
    </div>
  )
}

export default FollowedUsers