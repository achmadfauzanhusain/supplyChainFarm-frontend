import Image from "next/image"
import { useRouter } from 'next/navigation'

import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

const EditStatus = () => {
    const router = useRouter()
    return (
        <div className="mt-10 md:mt-18 px-2 sm:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image src="/icon/back.png" width={30} height={0} />
            </button>

            <div className="flex justify-between items-center mt-8">
                <h1 className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl font-bold`}>Kopi Arabica</h1>

                <div>
                    <p className="text-xs md:text-sm opacity-75 font-semibold">tokenId</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#121</h2>
                </div>
            </div>
            <div className="flex justify-between items-center mt-0 sm:mt-2 md:mt-4">
                <div>
                    <p className="text-xs md:text-sm opacity-75 font-semibold">batch</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">#1</h2>
                </div>
            </div>

            <div className="mt-7 sm:mt-10 md:mt-14">
                <div className="flex flex-col gap-2">
                    <label className="font-[1000] text-xs sm:text-sm md:text-base">Current Status</label>
                    <input
                        className="w-full sm:w-[75%] md:w-[50%] text-sm sm:text-base border-b px-2 sm:px-4 py-3 font-medium outline-none"
                        placeholder="Shipped to distributor"
                    />
                </div>
                <button className="w-full text-xs mt-6 py-3 md:py-4 relative cursor-pointer transition-all duration-300 px-6 rounded-md md:rounded-lg text-white
                    bg-linear-to-r from-[#0D6EFD] to-blue-600
                    shadow-inner overflow-hidden
                    hover:from-blue-400 hover:to-blue-500
                    inset-shadow-sm inset-shadow-white/5"
                >
                    <span className="relative z-10 font-semibold">Update current status</span>
                    <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
                </button>
            </div>
        </div>
    )
}

export default EditStatus