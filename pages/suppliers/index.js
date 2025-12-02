import Link from "next/link";
import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const Suppliers = () => {
    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-4 lg:px-18">
            <div className="flex justify-between items-center">
                <h1 className={`${urbanist.className} text-2xl md:text-3xl font-[1000] bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}>Suppliers</h1>

                <input
                    className="text-xs sm:text-sm md:text-sm border-b w-[60%] md:w-[50%] px-3 py-3 outline-none"
                    placeholder="Search by supplier name"
                />
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-xs sm:text-sm md:text-base font-[1000]">PT KOPI INDONESIA</h2>
                    <p className="text-xs font-medium opacity-75">Toraja, Sulawesi Selatan</p>
                </Link>
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-xs sm:text-sm md:text-base font-[1000]">PT Sinarmas</h2>
                    <p className="text-xs font-medium opacity-75">Karawang, Jawa Barat</p>
                </Link>
                <Link href="/suppliers/0x29f19a33c3af612cb5248d2e208b1113d0898e5b" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="text-xs sm:text-sm md:text-base font-[1000]">PT Kebun Raya</h2>
                    <p className="text-xs font-medium opacity-75">Bogor, Jawa Barat</p>
                </Link>
            </div>
        </div>
    )
}

export default Suppliers;