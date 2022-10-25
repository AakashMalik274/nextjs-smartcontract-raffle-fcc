import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className=" p-5 bottom-b-2 flex flex-row">
            <div className="py-2 px-4">
                <img src="/Logo.png"></img>
            </div>

            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
            {/*moralisAuth is false as we don't want to connect to a server*/}
        </div>
    )
}
