import "../styles/globals.css"
import { MoralisProvider } from "react-moralis" //For our app to use useMoralis functionality, we need to add MoralisProvider to our app entry point or app.js
import { NotificationProvider } from "web3uikit" //for using notifications from web3uiKit

function MyApp({ Component, pageProps }) {
    return (
        //initializeOnMount is a functionality if we want to hook into some server
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
