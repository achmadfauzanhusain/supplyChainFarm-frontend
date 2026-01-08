import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../../abis/SupplyChainNFT.json"

const DetailProduct = () => {
    const [contract, setContract] = useState(null)
    const [product, setProduct] = useState({})
    const [tokenId, setTokenId] = useState()

    const router = useRouter()
    const { id } = router.query

    const loadBlockchainData = async() => {
        const provider = new BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            provider
        )
        setContract(supplyChainNFT)
    }

    const fetchDetailProduct = async() => {
        const nextTokenId = await contract.nextTokenId()
        const tokenId = Number(nextTokenId) - 1
        const product = await contract.products(id)
        setProduct(product)
        setTokenId(tokenId)
    }

    useEffect(() => {
        loadBlockchainData()
    }, [])

    useEffect(() => {
        if (!contract || !router.isReady) return;
        fetchDetailProduct()
    }, [contract, router.isReady])
    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-8 lg:px-18 pb-8">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </button>

            <div className="flex justify-between items-center mt-8">
                <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-bold`}>{product?.name}</h1>

                <div>
                    <p className="text-xs sm:text-sm opacity-75 font-semibold">tokenId</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#{tokenId}</h2>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs sm:text-sm opacity-75 font-semibold">batch</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#{product?.batch_number}</h2>
                </div>

                <div>
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b/3/edit-status" className="relative cursor-pointer transition-all duration-300 px-3 sm:px-6 py-2 rounded-lg text-white 
                            bg-linear-to-r from-[#0D6EFD] to-blue-600
                            shadow-inner overflow-hidden
                            hover:from-blue-400 hover:to-blue-500
                            inset-shadow-sm inset-shadow-white/5"
                >
                    <span className="relative z-10 text-xs">edit status</span>
                    <span className="absolute inset-0 bg-white opacity-20 blur-md rounded-lg"></span>
                </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-5">
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">quantity</h2>
                    <p className="text-xs font-medium opacity-75">{Number(product.quantity_kg)}kg</p>
                </div>
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">origin</h2>
                    <p className="text-xs font-medium opacity-75">{product?.origin}</p>
                </div>
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">production date</h2>
                    <p className="text-xs font-medium opacity-75">2025 - 10 - 25</p>
                </div>
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">current status</h2>
                    <p className="text-xs font-medium opacity-75">{product?.currentStatus}</p>
                </div>
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">address supplier</h2>
                    <p className="text-xs font-medium opacity-75">{product?.supplier?.slice(0, 6) + '...' + product?.supplier?.slice(38, 42)}</p>
                </div>
            </div>

            <div className="mt-14">
                <h2 className="text-sm font-semibold">Description</h2>
                <p className="text-xs opacity-75 mt-1 font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
        </div>
    )
}

export default DetailProduct;