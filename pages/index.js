const Home = () => {
  const styles = {
    body: {
      display: "flex",
      alignItems: "center",
      height: "100vh",
    },
    btnContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

    },
    btnInner: {
      backgroundColor: `#fff`,
      color: "black",
      borderRadius: "5px",
      padding: "14px 25px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      margin: "10px"
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.btnContainer}>
        {/* <a style={styles.btnInner} href="/addUser">Add User</a> */}
        <a style={styles.btnInner} href="/getClips">Get Clips</a>
      </div>
    </div>
  )
}

export default Home
