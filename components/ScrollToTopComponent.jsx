import { useEffect } from 'react'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'
import { styles } from '@/styles/styles';
import useGetAccessToken from '@/hooks/useGetAccessToken';

export const node_env = process.env.NODE_ENV;
export const domain = node_env === 'development' ? 'https://localhost:3000' : 'https://twitch-clip-downloader-dev.vercel.app/';
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
                            <a href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchClientID}&redirect_uri=${domain}&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`}>Connect with Twitch</a>
                        </div>
                    )
            }
        </div>
    )
}