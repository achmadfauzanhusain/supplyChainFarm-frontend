import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

const Owned = () => {
    const router = useRouter()
    return (
        <div className="mt-10 md:mt-18 px-5 md:px-8 lg:px-18">
            <button className="cursor-pointer" onClick={() => router.back()}>
                <Image src="/icon/back.png" width={30} height={0} />
            </button>
            <h1 className={`${urbanist.className} mt-8 text-3xl sm:text-4xl md:text-5xl font-bold`}>Product You Owned</h1>
            <p className="text-xs sm:text-sm md:text-base mt-2 opacity-75">You can change the status of the products you own.</p>

            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <Link href="/detail-product" className="bg-[#BEE3F8]/25 py-4 px-3 rounded-lg">
                    <h2 className="font-[1000]">Kopi Arabica</h2>
                    <p className="text-xs font-medium opacity-75">Toraja, Sulawesi Selatan</p>
                    <p className="text-xs font-medium opacity-75 mt-1">Batch 1</p>
                    <p className="text-xs font-medium opacity-75 mt-1">100kg</p>
                </Link>
            </div>
        </div>
    )
}

export default Owned