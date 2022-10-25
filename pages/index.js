import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Raffle</title>
                <meta name="description" content="Our Smart Contract Lottery" />
                <link rel="icon" href="/lottery.ico" />
            </Head>
            <Header />
            <LotteryEntrance />
        </div>
    )
}
