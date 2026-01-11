import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
import { uploadToPinata } from "@/services/supplier";

import { BrowserProvider, Contract, parseEther } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../abis/SupplyChainNFT.json";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Mint = () => {
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState("")

    // input states
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [batchNumber, setBatchNumber] = useState("");
    const [quantityKg, setQuantityKg] = useState();
    const [productionDate, setProductionDate] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter()

    const loadBlockchainData = async () => {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }], // 11155111 in hex
        })

        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const signer = await provider.getSigner()
        setSigner(signer.address)

        const supplyChainNFT = new Contract(
            config[network.chainId].SupplyChainNFT.address,
            SupplyChainNFT,
            signer
        )
        setContract(supplyChainNFT);
    }

    const mintProduct = async() => {
        if (!contract) return;
        try {
            const nextTokenId = await contract.nextTokenId()
            const metadata = { description, productionDate }

            const ipfsURI = await uploadToPinata(metadata, nextTokenId)
            if(ipfsURI) {
            await contract.mintProduct(
                name,
                origin,
                batchNumber,
                BigInt(quantityKg),
                String(ipfsURI),
                {
                    value: await parseEther("0.001")
                }
            )
                toast.success("Minting Success!")
                router.push(`/suppliers/${signer}`)
            }
        } catch (error) {
            toast.error("Minting failed: " + error.message)
        }
    }

    useEffect(() => {
        loadBlockchainData();
    }, []);
    return (
        <div className="mt-18 px-2 sm:px-4 md:px-8 lg:px-18 pb-14">
            <Link href="/">
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
            </Link>

            <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-[1000] mt-10`}><span className="bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent">I Want to make My</span><br /> Product Decentralized</h1>
            <div className="mt-10">
                <h1 className={`${urbanist.className} text-2xl sm:text-3xl md:text-4xl font-[1000]`}>Mint New Product</h1>

                {/* jika signer tidak ada jangan tampilkan ini! */}
                {signer && (
                    <>
                        <div className="mt-10 flex flex-col gap-12">
                            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter product name" />
                            <input value={origin} onChange={(event) => setOrigin(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter origin name: Toraja, Sulawesi Selatan" />
                            <input value={batchNumber} onChange={(event) => setBatchNumber(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter batch number" />
                            <input value={quantityKg} onChange={(event) => setQuantityKg(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter quantity per kg" />
                            <input value={productionDate} onChange={(event) => setProductionDate(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Production date: YYYY-MM-DD" />
                            <input value={description} onChange={(event) => setDescription(event.target.value)} className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter product description" />
                        </div>

                        <button 
                            onClick={mintProduct}
                            className="relative cursor-pointer transition-all duration-300 py-3 md:py-4 rounded-lg text-white bg-linear-to-r from-[#0D6EFD] to-blue-600 shadow-inner overflow-hidden hover:from-blue-400 hover:to-blue-500 inset-shadow-sm inset-shadow-white/5 w-full mt-8 text-xs md:text-sm font-semibold">
                            <span className="relative z-10">Mint Product</span>
                            <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
                        </button>
                    </>
                )}
                {!signer && (
                    <p className="mt-10 text-sm opacity-70 font-semibold">
                        Register become supplier if you want to minting product
                    </p>
                )}
            </div>
        </div>
    )
}

export default Mint