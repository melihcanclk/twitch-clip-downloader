import { useEffect } from 'react'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'
import { styles } from '@/styles/styles';
import useGetAccessToken from '@/hooks/useGetAccessToken';

export const node_env = process.env.NODE_ENV;
export const domain = node_env === 'local' ? 'https://localhost:3000' : node_env === 'development' ? 'https://twitch-clip-downloader-dev.vercel.app/' : "https://twitch-clip-downloader.vercel.app/" ;
export const twitchClientID = process.env.TWITCH_CLIENT_ID;

export const ScrollToTopComponent = ({ children, title }) => {

    const [accessToken] = useGetAccessToken();
    return (
        <div >
            {
                accessToken ?
                    (
                        <div>
                            <div>
                                <h1 id="scroll-to-top">{ }</h1>
                            </div>
                            {children}
                            <ScrollToTopButton />
                        </div >
                    )
                    :
                    (
                        <div style={styles.connectTwitch}>
                            <a href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchClientID}&redirect_uri=${domain}&scope=openid+user:read:email+user:read:follows&claims={"id_token":{"email_verified":null},"userinfo":{"username":null,"picture":null}}`}>Connect with Twitch</a>
                        </div>
                    )
            }
        </div>
    )
}