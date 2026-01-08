import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../../abis/SupplyChainNFT.json"

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditStatus = () => {
    const [contract, setContract] = useState(null)
    const [product, setProduct] = useState({})

    const [loadingProduct, setLoadingProduct] = useState(true)

    // input
    const [newStatus, setNewStatus] = useState("")

    const router = useRouter()
    const { id } = router.query

    const loadBlockchainData = async() => {
        const provider = new BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        const signer = await provider.getSigner()
        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            signer
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

    // update status
    const updateStatus = async() => {
        if(!contract) return
        try {
            await contract.updateStatus(id, newStatus)
            toast.success("Success changing status!")
            router.push(`/suppliers/${product?.supplier}/${id}`)
        } catch (error) {
            toast.error("Updating failed: " + error)
        }
    }

    useEffect(() => {
        loadBlockchainData()
    }, [])

    useEffect(() => {
        if(!contract || !router.isReady) return
        fetchDetailProduct()
    }, [contract, router.isReady])

    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt=""/>
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
                    <p className="text-xs md:text-sm opacity-75 font-semibold">tokenId</p>
                    {loadingProduct ? (
                        <div className="h-8 w-16 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#{id}</h2>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-0 sm:mt-2 md:mt-4">
                <div>
                    <p className="text-xs md:text-sm opacity-75 font-semibold">batch</p>
                    {loadingProduct ? (
                        <div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            #{product?.batch_number}
                        </h2>
                    )}
                </div>
            </div>

            <div className="mt-7 sm:mt-10 md:mt-14">
                <div className="flex flex-col gap-2">
                    <label className="font-[1000] text-xs sm:text-sm md:text-base">
                        Current Status
                    </label>

                    {loadingProduct ? (
                        <div className="w-full sm:w-[75%] md:w-[50%] h-12 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <input
                            value={newStatus}
                            onChange={(event) => setNewStatus(event.target.value)}
                            className="w-full sm:w-[75%] md:w-[50%] text-xs sm:text-sm md:text-base border-b px-2 sm:px-4 py-3 font-medium outline-none"
                            placeholder="Shipped to distributor"
                        />
                    )}
                </div>

                <button 
                    onClick={updateStatus}
                    disabled={loadingProduct}
                    className={`w-full text-xs mt-6 py-3 md:py-4 relative transition-all duration-300 px-6 rounded-md md:rounded-lg text-white
                    ${loadingProduct 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-linear-to-r from-[#0D6EFD] to-blue-600 hover:from-blue-400 hover:to-blue-500 cursor-pointer"}
                    shadow-inner overflow-hidden
                    inset-shadow-sm inset-shadow-white/5`}
                >
                    <span className="relative z-10 font-semibold">
                        Update current status
                    </span>
                    {!loadingProduct && (
                        <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default EditStatus;