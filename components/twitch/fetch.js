// wrap twitch fetch in custom hook
const fetchData = (async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    const json = await res.json()
    return json
})

export default fetchData