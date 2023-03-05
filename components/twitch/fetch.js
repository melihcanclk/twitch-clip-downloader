// wrap twitch fetch in custom hook
const fetchData = (async (url) => {
    const access_token = localStorage.getItem('access_token')
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`
        }
    })
    const json = await res.json()
    return json
})

export default fetchData