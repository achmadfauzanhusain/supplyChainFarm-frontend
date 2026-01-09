import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../../abis/SupplyChainNFT.json"

import { ipfsToHttp } from "@/services/supplier";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DetailProduct = () => {
    const [contract, setContract] = useState(null)
    const [signer, setSigner] = useState("")
    const [product, setProduct] = useState({})
    const [metadata, setMetadata] = useState(null)

    const [loadingProduct, setLoadingProduct] = useState(true)
    const [loadingMetadata, setLoadingMetadata] = useState(true)

    const router = useRouter()
    const { id } = router.query

    const isOwner = signer === product?.currentHolder

    const loadBlockchainData = async() => {
        const provider = new BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        const signer = await provider.getSigner()
        setSigner(signer.address)
        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            provider
        )
        setContract(supplyChainNFT)
    }

    const fetchDetailProduct = async() => {
        try {
            const product = await contract.products(id)
            setProduct(product)
        } catch (error) {
            toast.error(error)
        } finally {
            setLoadingProduct(false)
        }
    }

    useEffect(() => {
        loadBlockchainData()

        if (!contract || !router.isReady) return
        fetchDetailProduct()
    }, [contract, router.isReady])

    useEffect(() => {
        if(!product.metadataURI) return

        const fetchMetadata = async() => {
            try {
                const url = await ipfsToHttp(product.metadataURI)
                const res = await axios.get(url)
                setMetadata(res.data)
            } catch (error) {
                toast.error(error)
            } finally {
                setLoadingMetadata(false)
            }
        }
        fetchMetadata()
    }, [product.metadataURI])
    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-8 lg:px-18 pb-8">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </button>

            <div className="flex justify-between items-center mt-8">
                <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-bold`}>
                    {loadingProduct ? (
                        <div className="h-10 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        product?.name
                    )}
                </h1>

                <div>
                    <p className="text-xs sm:text-sm opacity-75 font-semibold">tokenId</p>
                    {loadingProduct ? (
                        <div className="h-8 w-16 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#{id}</h2>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs sm:text-sm opacity-75 font-semibold">batch</p>
                    {loadingProduct ? (
                        <div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            #{product?.batch_number}
                        </h2>
                    )}
                </div>
                
                {isOwner ? (
                    <Link
                        href={`/suppliers/${product?.supplier}/${id}/edit-status`}
                        className="relative cursor-pointer transition-all duration-300 px-3 sm:px-6 py-2 rounded-lg text-white
                        bg-linear-to-r from-[#0D6EFD] to-blue-600
                        shadow-inner overflow-hidden
                        hover:from-blue-400 hover:to-blue-500
                        inset-shadow-sm inset-shadow-white/5"
                    >
                        <span className="relative z-10 text-xs">edit status</span>
                        <span className="absolute inset-0 bg-white opacity-20 blur-md rounded-lg"></span>
                    </Link>
                ) : (
                    <div>
                        
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-5">
                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">quantity</h2>
                    {loadingProduct ? (
                        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mt-1"></div>
                    ) : (
                        <p className="text-xs font-medium opacity-75">{Number(product.quantity_kg)}kg</p>
                    )}
                </div>

                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">origin</h2>
                    {loadingProduct ? (
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mt-1"></div>
                    ) : (
                        <p className="text-xs font-medium opacity-75">{product?.origin}</p>
                    )}
                </div>

                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">production date</h2>
                    {loadingMetadata ? (
                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mt-1"></div>
                    ) : (
                        <p className="text-xs font-medium opacity-75">{metadata?.productionDate}</p>
                    )}
                </div>

                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">current status</h2>
                    {loadingProduct ? (
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mt-1"></div>
                    ) : (
                        <p className="text-xs font-medium opacity-75">{product?.currentStatus}</p>
                    )}
                </div>

                <div className="bg-[#BEE3F8]/25 py-3 md:py-4 px-2 md:px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-bold">address supplier</h2>
                    {loadingProduct ? (
                        <div className="h-4 w-28 bg-gray-300 rounded animate-pulse mt-1"></div>
                    ) : (
                        <p className="text-xs font-medium opacity-75">
                            {product?.supplier?.slice(0, 6) + "..." + product?.supplier?.slice(38, 42)}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-14">
                <h2 className="text-sm font-semibold">Description</h2>
                {loadingMetadata ? (
                    <div className="mt-2 space-y-2 animate-pulse">
                        <div className="h-3 w-full bg-gray-300 rounded"></div>
                        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                        <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
                    </div>
                ) : (
                    <p className="text-xs opacity-75 mt-1 font-semibold">
                        {metadata?.description}
                    </p>
                )}
            </div>
        </div>
    )
}

export default DetailProduct;