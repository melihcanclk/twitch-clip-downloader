import WriteToFirestore from '@/components/firebase/write'
import { useState } from 'react'
import ListUser from '@/components/listUser';
import { firestore } from '@/utils/firebase'

const AddUser = (props) => {
  // get data from props
  const [entries, setEntries] = useState(props.entries);

  return (
    <div style={{
      
    }}>
      <WriteToFirestore entries={entries} setEntries={setEntries} />
      <ListUser entries={entries} setEntries={setEntries} />
    </div>
  )
}

export default AddUser

export async function getServerSideProps() {
  const entries = await firestore.collection("streamers").get();
  console.log({ entries })
  const entriesData = entries.docs.map((entry) => ({
      id: entry.id,
      ...entry.data()
  }))
  return {
      props: { entries: entriesData }
  }
}