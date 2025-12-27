import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

import { Urbanist } from "next/font/google"
import { registerSupplier } from "@/services/supplier"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

const Register = () => {
    const [supplierName, setSupplierName] = useState("")
    const [origin, setOrigin] = useState("")
    const [walletAddress, setWalletAddress] = useState("")
    const [supplierEmail, setSupplierEmail] = useState("")

    const onSubmit = async() => {
        const data = { supplierName, origin, walletAddress, supplierEmail }
        
        const response = await registerSupplier(data)
        if(response?.error === true) {
            
        }
    }

    return (
        <div className="mt-10 md:mt-18 px-4 sm:px-8 lg:px-18 pb-14">
            <Link href="/">
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} />
            </Link>
            
            <h1 className={`${urbanist.className} mt-8 text-3xl md:text-4xl font-[1000]`}><span className="bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent">Register your wallet to</span> <br /> become a supplier</h1>
            <div className="flex flex-col gap-10 md:gap-14 mt-10 md:mt-14">
                <input
                    value={supplierName}
                    onChange={(event) => setSupplierName(event.target.value)}
                    className="text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Supplier Name : PT KOPI ..." 
                />
                <input
                    value={origin}
                    onChange={(event) => setOrigin(event.target.value)}
                    className="text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Origin : Toraja, Sulawesi Selatan" 
                />
                <input
                    value={walletAddress}
                    onChange={(event) => setWalletAddress(event.target.value)}
                    className="text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="ETH Wallet Address" 
                />
                <input
                    value={supplierEmail}
                    onChange={(event) => setSupplierEmail(event.target.value)}
                    className="text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Supplier Email" 
                />
            </div>
            <button onClick={onSubmit} className="w-full text-xs mt-6 py-4 relative cursor-pointer transition-all duration-300 px-6 rounded-md text-white
                bg-linear-to-r from-[#0D6EFD] to-blue-600
                shadow-inner overflow-hidden
                hover:from-blue-400 hover:to-blue-500
                inset-shadow-sm inset-shadow-white/5"
            >
                <span className="relative z-10 font-semibold">Register Now</span>
                <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
            </button>
            <div className="mt-3 text-sm hover:underline inline-block">
                <Link href="/tutorial" >How to get ETH wallet address</Link>
            </div>
        </div>
    )
}

export default Register