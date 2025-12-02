import Image from "next/image";
import Link from "next/link";

import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

const Tutorial = () => {
    return (
        <div className="mt-10 md:mt-18 px-4 sm:px-8 lg:px-18 pb-24">
            <Link href="/register">
                <Image src="/icon/back.png" width={30} height={0} />
            </Link>
            <div className="">
                <Image className="mx-auto" src="/icon/metamask.png" width={300} height={0} />
                <h1 className={`${urbanist.className} text-5xl md:text-6xl text-center font-bold`}>
                    <span className="bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent">How to get</span><br /> ETH wallet<br /> address
                </h1>
            </div>
            <hr className="mt-14 opacity-25 w-[90%] mx-auto" />
            <div className="mt-14 flex flex-col gap-12">
                <div>
                    <h2 className={`${urbanist.className} text-2xl md:text-3xl font-bold`}>Step 1: Install <span className="text-[#F6851B]">Metamask</span></h2>
                    <h3 className="text-lg md:text-xl font-semibold">Pilih Perangkat :</h3>
                    <div className="px-6">
                        <h4 className="text-lg md:text-xl font-semibold">Browser(Desktop) :</h4>
                        <div className="text-sm md:text-base px-6 flex gap-2 flex-col mt-2">
                            <p>1. Go to https://metamask.io</p>
                            <p>2. Click “Download” → “Install MetaMask for Chrome/Brave/Edge/Firefox”</p>
                            <p>3. Add the MetaMask extension to your browser</p>
                        </div>
                        <h4 className="text-lg md:text-xl font-semibold mt-4">Mobile :</h4>
                        <p className="px-6 mt-2 text-sm md:text-base">Download the MetaMask app from Google Play Store or App Store.</p>
                    </div>
                </div>

                <div>
                    <h2 className={`${urbanist.className} text-2xl md:text-3xl font-bold`}>Step 2: Create a New Wallet</h2>
                    <div className="text-sm md:text-base px-6 flex flex-col gap-2 mt-2">
                        <p>1. Open <span className="text-[#F6851B]">Metamask</span> (extension or app)</p>
                        <p>2. Click "Get Started"</p>
                        <p>3. Select "Create a Wallet"</p>
                        <p>4. Create a strong password and agree to the terms</p>
                        <p>5. Securely back up your Secret Recovery Phrase</p>
                        <div className="px-6">
                            <p className="font-semibold text-red-400">important!</p>
                            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-200">
                                <li>Write it down and keep it in a safe, offline place.</li>
                                <li>Never share or screenshot it.</li>
                                <li>Without it, you cannot recover your wallet if lost.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                    Step 3: Your Wallet is<span className="text-[#00DA5E]"> Ready</span>
                </h3>
                <ul className="text-sm md:text-base list-disc list-inside mt-4 space-y-2 text-gray-200">
                    <li>
                        You’ll now have an Ethereum address, something like:
                    <span className="font-mono text-white">0xA1b2C3d4E5f6g7H8i9J0kL1M2N3o4P5q6R7s8T9</span>
                    </li>
                    <li>
                        This is your public wallet address — similar to a bank account number. 
                        You can share it to receive crypto.
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Tutorial;