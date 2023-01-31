import styles from '@/styles/Home.module.css'
import { firestore } from '../utils/firebase'
import WriteToFirestore from '../components/firebase/write'

const Home = (props) => {
  // get data from props
  const { entries } = props;

  return (
    <div style={{
      margin: "20px"
    }}>
      <div className={styles.btnContainer}>
        <WriteToFirestore />
      </div>
      {
        entries.map((entry) => (
          <div key={entry.id}>
            <h1>Username : {entry.username}</h1>
            <p>Name : {entry.firstname}</p>
            <p>Surname : {entry.lastname}</p>
            <p>Send Date : {
              // TODO : locale date
              new Date(entry.sendDate).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
              })
            }</p>
          </div>
        ))
      }
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