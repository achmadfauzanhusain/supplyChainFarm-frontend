import Navbar from "@/components/navbar";
import Link from "next/link"
import Image from "next/image";
import { Urbanist } from "next/font/google"

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pb-14">
        <div className="mt-18 text-center">
          <h1 className={`${urbanist.className} text-4xl sm:text-5xl md:text-6xl font-[1000]
            bg-linear-to-r 
            from-[#0D6EFD] 
            via-[#5fa8ff]
            to-white
            dark:from-[#4dabff] 
            dark:to-white 
            bg-clip-text inline-block text-transparent`}>
            Decentralized
          </h1>
          <h1 className={`${urbanist.className} text-4xl sm:text-5xl md:text-6xl font-bold`}>Supply Chain For <br /> Your Product</h1>
          <p className="mt-4 font-medium text-sm sm:text-base md:text-lg opacity-75">Make your farm product <span className="text-[#38B2AC]">Supply Chain</span> transparent</p>
        </div>

        <div className="mt-28 md:mt-32 px-4 sm:px-8 lg:px-18">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Increase Consumer Confidence</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Consumers can see the origin of the product directly</p>
            </div>
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Preventing Product Counterfeiting</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Counterfeiters cannot duplicate because each product has a unique NFT.</p>
            </div>
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Improving Logistics Efficiency</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Reduce administrative errors and verification time.</p>
            </div>
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Easier Audits and Regulations</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">It is easier to conduct audits, especially for sensitive goods such as food, medicine, or agricultural products.</p>
            </div>
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Environmental and Ethical Transparency</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Helps company reputation and attracts sustainability-conscious consumers.</p>
            </div>
            <div className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Enhances Trust and Collaboration Among Business Partners</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Real-time shared data reduces conflicts and improves cooperation.</p>
            </div>
          </div>
        </div>

        <div className="mt-28 md:mt-32 text-center">
          <h1 className={`${urbanist.className} text-4xl md:text-5xl font-bold
            bg-linear-to-r 
            from-[#0D6EFD] 
            via-[#5fa8ff]
            to-white
            dark:from-[#4dabff] 
            dark:to-white 
            bg-clip-text inline-block text-transparent`}>
            Its Simple Like This :
          </h1>
          <p className="mt-4 font-medium text-sm sm:text-base md:text-lg opacity-75">Transparent <span className="text-[#38B2AC] opacity-100">Supply Chain</span> = trustworthy data + <br /> process efficiency + stronger reputation + protection <br /> from fraud.</p>
        </div>

        <div className="mt-28 md:mt-32 px-4 lg:px-18">
          <div className="flex gap-8 md:gap-0 flex-col md:flex-row justify-evenly items-center">
            <div>
              <Image className="w-[350px] md:w-[400px]" src="/photo/vitalik.png" width={400} height={400} alt="vitalik buterin" />
            </div>
            <div className={`${urbanist.className} max-w-lg text-left`}>
              <h1 className="text-3xl lg:text-4xl">“The great thing about <br /> blockchain is that once you <br /> understand it, you realize <br /> how much it can change <br />everything.”</h1>
              <p className="text-3xl lg:text-4xl mt-4 font-bold">- Vitalik Buterin</p>
            </div>
          </div>
        </div>

        <div className="mt-32 md:mt-44 text-center">
          <h1 className={`${urbanist.className} text-4xl md:text-5xl font-bold
            bg-linear-to-r 
            from-[#0D6EFD] 
            to-white
            dark:from-[#4dabff] 
            dark:to-white 
            bg-clip-text inline-block text-transparent`}>
            You Have a Bussiness?
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium opacity-75">Do you have a company or are you a supplier? You <br /> can make your product <span className="text-[#38B2AC] opacity-100">Supply Chain</span> transparent.</p>
          
          <button className="relative cursor-pointer transition-all duration-300 px-6 py-3 rounded-lg text-white
            bg-linear-to-r from-[#0D6EFD] to-blue-600
            shadow-inner overflow-hidden
            hover:from-blue-400 hover:to-blue-500
            inset-shadow-sm inset-shadow-white/50 mt-6 text-xs md:text-sm">
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
          </button>
        </div>

        {/* footer */}
        <div className="mt-32 md:mt-44 px-4 sm:px-8 lg:px-18">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-0">
            <div className="flex items-center gap-4">
              <Image alt="" className="w-[30px] sm:w-5 md:w-[30px]" src="/logo.png" width={30} height={0} />
              <p className={`${urbanist.className} text-lg md:text-xl font-semibold`}>fauzanhusain</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className={`${urbanist.className} text-lg md:text-xl font-semibold`}>Social Media</h3>

              <div className="flex items-center gap-6">
                <Link href="">
                  <Image alt="" className="w-[30px] sm:w-5 md:w-[30px]" src="/icon/instagram.png" width={25} height={0} />
                </Link>
                <Link href="">
                  <Image alt="" className="w-[30px] sm:w-5 md:w-[30px]" src="/icon/linkedin.png" width={25} height={0} />
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className={`${urbanist.className} text-lg md:text-xl font-semibold`}>Contact</h3>
              <p className="text-xs md:text-sm font-semibold flex items-center gap-2">
                <Image alt="" src="/icon/email.png" className="sm:w-5 md:w-[25px]" width={25} height={0} />
                achmadfauzanhusain<br className="hidden md:block" />13@gmail.com
              </p>
              <p className="text-xs md:text-sm font-semibold flex items-center gap-2">
                <Image alt="" src="/icon/whatsapp.png" className="sm:w-5 md:w-[25px]" width={25} height={0} />
                0896 8405 3091
              </p>
            </div>
          </div>

          <div className="ptext-sm md:text-base x-28 mt-24">
            <p className="text-xs md:text-sm opacity-75">
              Decentralized Supply Chain NFT is a blockchain-based product tracking system that ensures transparency and authenticity in the supply chain.
              Each product is represented as a unique NFT, containing important data such as origin, batch number, production quantity, and current status.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
