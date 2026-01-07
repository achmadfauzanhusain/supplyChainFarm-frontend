import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import { BrowserProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../abis/SupplyChainNFT.json";

const Supplier = () => {
    const [contract, setContract] = useState(null);
    const [products, setProducts] = useState()

    const router = useRouter()
    const { address } = router.query
    
    const loadBlockchainData = async() => {
        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            provider
        );
        setContract(supplyChainNFT);
    }

    const fetchProduct = async() => {
        if(!contract) return
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
                    metadataURI: p.metadataURI,
                    status: p.currentStatus,
                    supplier: p.supplier,
                    createdAt: Number(p.createdAt),
                });
            }
        }
        setProducts(items)
    }

    useEffect(() => {
        loadBlockchainData();
    }, []);

    useEffect(() => {
        if (!contract) return;
        fetchProduct();
    }, [contract]);
    console.log(products)
    return (
        <div className="mt-10 md:mt-18 px-5 md:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </button>

            <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-bold mt-8`}>PT KOPI INDONESIA</h1>
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b/3" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-[1000]">Kopi Arabica</h2>
                    <p className="text-xs font-medium opacity-75">Toraja, Sulawesi Selatan</p>
                    <p className="text-xs font-medium opacity-75 mt-1">Batch 1</p>
                    <p className="text-xs font-medium opacity-75 mt-1">100kg</p>
                </Link>
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b/2" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-[1000]">Kopi Arabica</h2>
                    <p className="text-xs font-medium opacity-75">Toraja, Sulawesi Selatan</p>
                    <p className="text-xs font-medium opacity-75 mt-1">Batch 2</p>
                    <p className="text-xs font-medium opacity-75 mt-1">100kg</p>
                </Link>
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b/1" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-sm md:text-base font-[1000]">Kopi Robusta</h2>
                    <p className="text-xs font-medium opacity-75">Toraja, Sulawesi Selatan</p>
                    <p className="text-xs font-medium opacity-75 mt-1">Batch 1</p>
                    <p className="text-xs font-medium opacity-75 mt-1">100kg</p>
                </Link>
            </div>
        </div>
    )
}

export default Supplier;