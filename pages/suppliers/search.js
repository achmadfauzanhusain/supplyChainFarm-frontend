import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

import { searchSupplier } from "@/services/supplier";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(true);

    // input
    const [supplierName, setSupplierName] = useState("")

    const searchSupplierName = async() => {
        const data = { supplierName }

        const response = await searchSupplier(data)
        if(response?.error === true) {
            toast.error(response.message);
        } else {
            setLoading(false)
            setSuppliers(response.data.data)
        }
    }

    const SupplierSkeleton = () => {
        return (
        <div className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg animate-pulse">
            <div className="h-4 w-3/4 bg-gray-300/40 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300/30 rounded"></div>
        </div>
        );
    }
    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-4 lg:px-18">
            <div className="flex justify-between items-center">
                <Link href="/suppliers">
                    <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} alt="" />
                </Link>

                <h1
                className={`${urbanist.className} text-2xl md:text-3xl font-[1000] bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}
                >
                    Suppliers
                </h1>
            </div>

            <div className="flex items-end gap-2 sm:gap-3 mt-16">
                <input
                    className="flex-1 text-sm px-4 py-3 border-b border-gray-600 outline-none"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                />

                <button onClick={searchSupplierName} className="px-2 sm:px-4 py-2 bg-[#0D6EFD] rounded-md">
                    <Image className="w-5 md:w-[25px]" src="/icon/search.png" width={30} height={0} alt="" />
                </button>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {loading ? Array.from({ length: 6 }).map((_, index) => (
                    <SupplierSkeleton key={index} />
                )) : suppliers.length === 0 ? (
                    <p className="col-span-full text-center text-sm opacity-60">
                        masih kosong
                    </p>
                ) : suppliers.map((supplier) => (
                    <Link
                        key={supplier.ethWalletAddress}
                        href={`/suppliers/${supplier.ethWalletAddress}`}
                        className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg"
                    >
                        <h2 className="text-xs sm:text-sm md:text-base font-[1000]">
                        {supplier.supplierName}
                        </h2>
                        <p className="text-xs font-medium opacity-75">
                        {supplier.origin}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Search