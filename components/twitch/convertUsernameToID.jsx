import fetchData from "@/components/twitch/fetch";

// convert twitch username to id
export const convertUserNameToID = async (username) => {
    const res = await fetchData(`https://api.twitch.tv/helix/users?login=${username}`);
    if (res.data.length > 0) {
        return res.data[0].id;
    }
    else {
        return null;
    }
}
