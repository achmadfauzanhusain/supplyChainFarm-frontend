import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Urbanist } from "next/font/google"
import { registerSupplier } from "@/services/supplier"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

const Register = () => {
    const [supplierName, setSupplierName] = useState("")
    const [origin, setOrigin] = useState("")
    const [ethWalletAddress, setEthWalletAddress] = useState("")
    const [emailSupplier, setEmailSupplier] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()

    const onSubmit = async() => {
        const data = { supplierName, origin, ethWalletAddress, emailSupplier, description }
        
        const response = await registerSupplier(data)
        if(response?.error === true) {
            toast.error(response.message);
        } else {
            toast.success(response.data.message);
            router.push("/")
        }
    }

    return (
        <div className="mt-10 md:mt-18 w-[95%] sm:w-[80%] lg:w-[90%] pb-14 mx-auto">
            <Link href="/">
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" alt="" width={30} height={0} />
            </Link>
            
            <h1 className={`${urbanist.className} mt-8 text-2xl sm:text-3xl md:text-4xl font-[1000]`}><span className="bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent">Register your wallet to</span> <br /> become a supplier</h1>
            <div className="flex flex-col gap-8 sm:gap-10 md:gap-14 mt-10 md:mt-14">
                <input
                    autoComplete="off"
                    type="text"
                    value={supplierName}
                    onChange={(event) => setSupplierName(event.target.value)}
                    className="text-base sm:text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Supplier Name : PT KOPI ..." 
                />
                <input
                    autoComplete="off"
                    type="text"
                    value={origin}
                    onChange={(event) => setOrigin(event.target.value)}
                    className="text-base sm:text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Origin : Toraja, Sulawesi Selatan" 
                />
                <input
                    autoComplete="off"
                    type="text"
                    value={ethWalletAddress}
                    onChange={(event) => setEthWalletAddress(event.target.value)}
                    className="text-base sm:text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="ETH Wallet Address" 
                />
                <input
                    autoComplete="off"
                    type="text"
                    value={emailSupplier}
                    onChange={(event) => setEmailSupplier(event.target.value)}
                    className="text-base sm:text-lg md:text-2xl border-b px-3 py-4 font-semibold outline-none"
                    placeholder="Supplier Email" 
                />

                <div className="bg-neutral-secondary-medium border rounded-b-2xl">
                    <textarea 
                        autoComplete="off"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows="8" 
                        className="block w-full p-4 text-sm text-heading bg-neutral-secondary-medium focus:ring-0 outline-none placeholder:text-body" 
                        placeholder="Write an description..." 
                        required
                        >    
                    </textarea>
                </div>
            </div>
            <button
            type="button"
            onClick={onSubmit}
            className="w-full mt-6 py-4 px-6 relative
                flex items-center justify-center
                text-xs font-semibold text-white
                cursor-pointer transition-all duration-300
                rounded-md
                bg-linear-to-r from-[#0D6EFD] to-blue-600
                shadow-inner overflow-hidden
                hover:from-blue-400 hover:to-blue-500
                inset-shadow-sm inset-shadow-white/5"
            >
            <span className="relative z-10">
                Register Now
            </span>
            <span className="absolute inset-0 rounded-md
                bg-white opacity-20 blur-md
                translate-x-3 translate-y-3"
            />
            </button>
            <div className="mt-3 text-sm hover:underline inline-block">
                <Link href="/tutorial">How to get your ETH wallet address</Link>
            </div>
        </div>
    )
}

export default Register