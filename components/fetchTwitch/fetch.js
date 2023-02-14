// wrap twitch fetch in custom hook
const fetchData = (async (url, options) => {
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    const json = await res.json()
    return json
})

export default fetchData