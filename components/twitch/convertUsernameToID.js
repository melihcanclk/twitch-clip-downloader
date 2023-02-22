import fetchData from "./fetch";    

// convert twitch username to id
const convertUserNameToID = async (username) => {
    const res = await fetchData(`https://api.twitch.tv/helix/users?login=${username}`);
    if (res.data.length > 0) {
        return res.data[0].id;
    }
    else {
        return null;
    }
}

export default convertUserNameToID;