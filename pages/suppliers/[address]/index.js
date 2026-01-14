import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, JsonRpcProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../abis/SupplyChainNFT.json";

import { detailSupplier } from "@/services/supplier";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Supplier = () => {
    const [contract, setContract] = useState(null);
    const [products, setProducts] = useState([])
    const [supplier, setSupplier] = useState({})

    const [loadingSupplier, setLoadingSupplier] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(true)

    const router = useRouter()
    const { address } = router.query
    
    const loadBlockchainData = async () => {
        const provider = new JsonRpcProvider(
            `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        );

        const network = await provider.getNetwork();

        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            provider
        );

        setContract(supplyChainNFT);
    };

    const fetchProducts = async() => {
        if(!contract || !address) return

        const nextTokenId = await contract.nextTokenId()
        const lastTokenId = Number(nextTokenId) - 1

        const items = []
        for(let tokenId = 1; tokenId <= lastTokenId; tokenId++) { 
            const p = await contract.products(tokenId)
            if(p.supplier === address) {
                items.push({
                    tokenId,
                    name: p.name,
                    origin: p.origin,
                    batch: p.batch_number,
                    quantity_kg: p.quantity_kg.toString(),
                    supplier: p.supplier
                });
            }
        }
        setProducts(items)
    }

    useEffect(() => {
        loadBlockchainData()
    }, []);
    useEffect(() => {
        if (!contract || !router.isReady) return;

        const fetchDetailSupplier = async() => {
            try {
                const response = await detailSupplier(address)
                setSupplier(response.data.data)
            } catch (error) {
                toast.error(error)
            } finally {
                setLoadingSupplier(false)
            }
        }

        const fetchProductsData = async () => {
            await fetchProducts()
            setLoadingProducts(false)
        }

        fetchDetailSupplier()
        fetchProductsData()
    }, [contract, router.isReady, products]);
    return (
        <div className="mt-10 md:mt-18 px-5 md:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </button>

            <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-bold mt-8 wrap-break-word`}>
                {loadingSupplier ? (
                    <div className="h-10 w-64 bg-gray-300 rounded-md animate-pulse"></div>
                ) : (
                    supplier.supplierName
                )}
            </h1>
            <p className="mt-2 md:mt-3 text-xs md:text-sm wrap-break-word">Supplier address : {supplier?.id}</p>

            <div className="mt-8 md:mt-10">
                {loadingProducts ? (
                    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-300/40 rounded-lg p-4">
                                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-1/3 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-sm opacity-60">Masih belum ada produk</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                )}
            </div>
        </div>
    )
}

export default Supplier;