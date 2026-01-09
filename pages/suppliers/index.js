import Link from "next/link";
import { useState, useEffect } from "react";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

import { registeredSuppliers } from "@/services/supplier";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await registeredSuppliers();
        setSuppliers(response.data.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <h1
          className={`${urbanist.className} text-2xl md:text-3xl font-[1000] bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}
        >
          Suppliers
        </h1>

        <Link href="/suppliers/search" className="text-xs sm:text-sm md:text-sm text-right w-[60%] md:w-[50%] px-3 py-3 outline-none">
          Search
        </Link>
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
  );
};

export default Suppliers;