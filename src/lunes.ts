import axios from "axios"
import {create} from "lunes-js-api"

const config =  {
    minimumSeedLength: 25,
    requestOffset: 0,
    requestLimit: 100,
    logLevel: "warning",
    timeDiff: 0,
    networkByte: "1".charCodeAt(0),
    nodeAddress: "https://lunesnode.lunes.io",
    matcherAddress: "https://lunesnode.lunes.io/matcher"
}


const lunes = create(config)


export const getActiveLeasings = async (seed: string) => {
    const { data } = await axios.get(`https://lunesnode.lunes.io/leasing/active/${decodeWallet(seed).address}`)
    return data
}

export const getBalance = async (seed: string) => {
    const { data } = await axios.get(`https://lunesnode.lunes.io/addresses/balance/${decodeWallet(seed).address}`)
    return data.balance
}

export const cancelLeasing = async (seed: string, txId: string) =>{
    return await lunes.API.Node.v1.leasing.cancelLeasing({
        transactionId: txId,
        fee: 100000
    },
    decodeWallet(seed).keyPair
    )
}

const decodeWallet = (seed: string) => lunes.Seed.fromExistingPhrase(seed)