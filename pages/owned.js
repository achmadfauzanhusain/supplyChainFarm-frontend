import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, Contract } from "ethers"
import config from "@/config.json"
import SupplyChainNFT from "../abis/SupplyChainNFT.json"
import next from "next"

const Owned = () => {
    const [contract, setContract] = useState(null)
    const [products, setProducts] = useState([])
    const [signer, setSigner] = useState("")

    const router = useRouter()

    const getProvider = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            return new BrowserProvider(window.ethereum)
        }

        return new JsonRpcProvider(
            `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        )
    }

    const loadBlockchainData = async() => {
        const provider = await getProvider()
        const network = await provider.getNetwork()

        let userAddress = ""

        // hanya ambil signer jika ada wallet
        if (provider instanceof BrowserProvider) {
            const signer = await provider.getSigner()
            userAddress = signer.address
            setSigner(userAddress)
        }

        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            provider
        )

        setContract(supplyChainNFT)
    }

    const fetchProductsOwned = async() => {
        if(!contract) return

        const nextTokenId = await contract.nextTokenId()
        const lastTokenId = Number(nextTokenId) - 1

        const items = []
        for(let tokenId = 1; tokenId <= lastTokenId; tokenId++) {
            const p = await contract.products(tokenId)
            if(p.supplier === signer || p.currentHolder === signer) {
                items.push({
                    tokenId,
                    name: p.name,
                    origin: p.origin,
                    batch: p.batch_number,
                    quantity_kg: p.quantity_kg.toString(),
                });
            }
        }
        setProducts(items)
    }

    useEffect(() => {
        loadBlockchainData()

        if(!contract) return
        fetchProductsOwned()
    }, [contract])
    return (
        <div className="mt-10 md:mt-18 px-5 md:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </button>
            <h1 className={`${urbanist.className} mt-8 text-3xl sm:text-4xl md:text-5xl font-bold`}>Product You Owned</h1>
            <p className="text-xs sm:text-sm md:text-base mt-2 opacity-75">You can change the status of the products you own.</p>

            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {products.map((p) => (
                    <Link
                        key={p.tokenId}
                        href={`/suppliers/${p.supplier}/${p.tokenId}`}
                        className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg"
                    >
                        <h2 className="text-sm md:text-base font-[1000]">{p.name}</h2>
                        <p className="text-xs font-medium opacity-75">{p.origin}</p>
                        <p className="text-xs font-medium opacity-75 mt-1">Batch {p.batch}</p>
                        <p className="text-xs font-medium opacity-75 mt-1">{p.quantity_kg}kg</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Owned