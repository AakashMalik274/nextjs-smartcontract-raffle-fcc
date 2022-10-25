import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../Constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Button, useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0x")
    let sendingTx = false

    const dispatch = useNotification()

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromCall)

        const numOfPlayers = (await getNumberOfPlayers()).toString()
        setNumberOfPlayers(numOfPlayers)

        const recentWinner = (await getRecentWinner()).toString()
        setRecentWinner(recentWinner)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "success",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1) // we do this here because onSuccess doesn't check for block confirmations
            handleNewNotification(tx)
            updateUIValues()
        } catch (error) {
            console.log(error)
        }
    }

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div>
                    <table>
                        <tr>
                            <td>Entrance Fee for this Raffle is :</td>
                            <td>{ethers.utils.formatEther(entranceFee)} ETH</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Number of Players in Raffle : </td>
                            <td>{numberOfPlayers}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Winner of Last Raffle is : </td>
                            <td>{recentWinner}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Button
                                    onClick={async () =>
                                        await enterRaffle({
                                            // onComplete:
                                            // onError:
                                            onSuccess: handleSuccess, //onSuccess doesn't check for block confirmation but only if a transaction is successfully sent to MetaMask
                                            onError: (error) =>
                                                console.log(error),
                                        })
                                    }
                                    isLoading={isLoading || isFetching}
                                    loadingText="Waiting for Approval"
                                    text="Enter Raffle"
                                    customize={{
                                        backgroundColor: "#EB9DBD",
                                        fontSize: 20,
                                        onHover: "#F76DA7",
                                        textColor: "#FFFFFF",
                                    }}
                                    theme="custom"
                                />
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            ) : (
                <div>Network Not Supported</div>
            )}
        </div>
    )
    //now we can use enterRaffle instead of runContractFunction wherever we wanna call this function
}
