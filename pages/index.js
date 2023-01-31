import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase'


const Home = (props) => {
  // get data from props
  const { entries } = props;

  return (
    <div>
      <div className={styles.btnContainer}>
        <button
          className={styles.button}>
          Add a New Note
        </button>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const entries = await firestore.collection("streamers").get();
  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data()
  }))
  return {
    props: { entries: entriesData }
  }
}