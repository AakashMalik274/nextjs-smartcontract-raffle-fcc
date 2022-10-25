import { useMoralis } from "react-moralis" //useMoralis() is a hook.
import { useEffect } from "react" //useEffect is also a hook from core react.It takes two parameters, first a function and second some dependency.
//It runs the function after the render all the times if no dependency is given and,
//It runs the function when the value of a dependency is changed, incase some dependencies are provided

export default function ManualHeader() {
    const {
        enableWeb3,
        deactivateWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        isWeb3EnableLoading,
    } = useMoralis() //enableWeb3 is a function to enable Web3. account gives address of the connected Web3 account

    useEffect(() => {
        if (isWeb3Enabled) {
            return
        }
        if (window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled]) //It will call the first parameter function, everytime isWeb3Enabled value changes

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            //
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account found")
            }
        })
    }, []) //It will call the first parameter function, everytime we render

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 3)}...
                    {account.slice(account.length - 3)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        enableWeb3()
                        window.localStorage.setItem("connected", "injected") //sets a key-value pair where key = connected, value = injected(metamask)
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
