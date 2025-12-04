import Link from "next/link"
import Image from "next/image"
import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const Mint = () => {
    return (
        <div className="mt-18 px-2 sm:px-4 md:px-8 lg:px-18 pb-14">
            <Link href="/">
                <Image className="w-[25px] md:w-[30px]" src="/icon/back.png" width={30} height={0} />
            </Link>

            <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-[1000] mt-10`}><span className="bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent">I Want to make My</span><br /> Product Decentralized</h1>
            <div className="mt-10">
                <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-[1000]`}>Mint New Product</h1>

                <div className="mt-10 flex flex-col gap-12">
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter product name" />
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter origin name: Toraja, Sulawesi Selatan" />
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter batch number" />
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter quantity per kg" />
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Production date: YYYY-MM-DD" />
                    <input type="text" className="w-full px-3 md:px-4 py-4 text-sm sm:text-base md:text-lg outline-none font-bold border-b" placeholder="Enter product description" />
                </div>
                <button className="relative cursor-pointer transition-all duration-300 py-3 md:py-4 rounded-lg text-white
                    bg-linear-to-r from-[#0D6EFD] to-blue-600
                    shadow-inner overflow-hidden
                    hover:from-blue-400 hover:to-blue-500
                    inset-shadow-sm inset-shadow-white/5 w-full mt-8 text-xs md:text-sm font-semibold">
                    <span class="relative z-10">Mint Product</span>
                    <span class="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
                </button>
            </div>
        </div>
    )
}

export default Mint