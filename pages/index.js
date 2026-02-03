import Navbar from "@/components/navbar";
import Link from "next/link"
import Image from "next/image";
import { useEffect } from "react";

import { Urbanist } from "next/font/google"
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

import AOS from "aos";
import "aos/dist/aos.css"

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="pb-14 overflow-x-hidden">
        <div className="mt-18 text-center">
          <h1 className={`${urbanist.className} text-4xl sm:text-5xl md:text-6xl font-[1000] bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}>
            Decentralized
          </h1>
          <h1
            className={`${urbanist.className} text-4xl sm:text-5xl md:text-6xl font-bold leading-tight`}
          >
            {"Supply Chain For".split("").map((char, i) => (
              <span
                key={`line1-${i}`}
                className="
                  inline-block
                  transition-all duration-300 ease-out
                  hover:scale-[1.1] hover:rotate-5
                  origin-bottom
                  cursor-pointer
                "
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}

            <br />

            {"Your Product".split("").map((char, i) => (
              <span
                key={`line2-${i}`}
                className="
                  inline-block
                  transition-all duration-300 ease-out
                  hover:scale-[1.1] hover:rotate-5
                  origin-bottom
                  cursor-pointer
                "
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p data-aos="fade-right" className="mt-4 font-medium text-sm sm:text-base opacity-75">
            Make your products more <span className="text-[#38B2AC]">transparent</span> with us.<br />
            Simply scan a QR code to see where your product <br /> comes from and how it moves from producer to consumer.
          </p>

          <div className="flex w-fit mx-auto items-center mt-6 gap-4 sm:gap-6">
            <Link data-aos="fade-right" href="/register" className="inline-block relative cursor-pointer transition-all duration-300 px-4 sm:px-6 py-3 rounded-lg text-white
              bg-linear-to-r from-[#0D6EFD] to-blue-600
              shadow-inner overflow-hidden
              hover:from-blue-400 hover:to-blue-500
              inset-shadow-sm inset-shadow-white/50 text-xs md:text-sm">
              <span className="relative z-10">Register Now</span>
              <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
            </Link>

            <Link data-aos="fade-right" href="/suppliers" className="inline-block relative cursor-pointer transition-all duration-300 px-4 sm:px-6 py-3 rounded-lg text-white
              bg-linear-to-r border border-white
              shadow-inner overflow-hidden
              hover:bg-white hover:border-black hover:text-black
              inset-shadow-sm inset-shadow-white/50 text-xs md:text-sm">
              <span className="relative z-10">See Suppliers</span>
              <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
            </Link>
          </div>
        </div>

        <div className="mt-28 md:mt-32 bg-blue-500 px-4 sm:px-8 lg:px-18 pt-6 pb-7 md:pt-8 md:pb-9">
          <p data-aos="fade-right" className="text-xs md:text-sm opacity-75">
            Hi, I’m <span className="font-bold">Achmad Fauzan Husain</span>, founder of <span className="font-bold">TBLO</span>.<br />
            I’m a software engineer focused on blockchain & decentralized systems, building real-<br />world infrastructure—not just whitepapers.
          </p>
          
          <div data-aos="fade-right" className="flex gap-6 text-xs md:text-sm opacity-75 mt-6">
            <Link className="hover:font-semibold transition-all duration-300" href="https://www.linkedin.com/in/achmadfauzanhusain/">LinkedIn</Link>
            <Link className="hover:font-semibold transition-all duration-300" href="https://github.com/achmadfauzanhusain">Github</Link>
            <Link className="hover:font-semibold transition-all duration-300" href="https://fauzanhusain.com">Founder Portfolio</Link>
          </div>
        </div>

        <div className="mt-28 md:mt-32 px-4 sm:px-8 lg:px-18">
          <h1 data-aos="fade-right" className={`${urbanist.className} text-4xl md:text-5xl font-bold bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}>See the Benefits</h1>
          <p className="mt-2 text-xs md:text-sm opacity-75">
            What are the benefits of using a decentralized supply chain?
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-5">
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Increase Consumer Confidence</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Consumers can see the origin of the product directly</p>
            </div>
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Preventing Product Counterfeiting</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Counterfeiters cannot duplicate because each product has a unique NFT.</p>
            </div>
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Improving Logistics Efficiency</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Reduce administrative errors and verification time.</p>
            </div>
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Easier Audits and Regulations</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">It is easier to conduct audits, especially for sensitive goods such as food, medicine, or agricultural products.</p>
            </div>
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Environmental and Ethical Transparency</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Helps company reputation and attracts sustainability-conscious consumers.</p>
            </div>
            <div data-aos="fade-up" className="border border-white p-6 rounded-2xl cursor-pointer hover:border-[#0D6EFD] transition-all duration-300">
              <h3 className="text-sm md:text-base font-semibold">Enhances Trust and Collaboration Among Business Partners</h3>
              <p className="text-xs md:text-sm opacity-75 mt-1">Real-time shared data reduces conflicts and improves cooperation.</p>
            </div>
          </div>
        </div>

        <div className="mt-28 md:mt-32 bg-[#38B2AC] px-4 sm:px-8 lg:px-18 pt-6 pb-7 md:pt-8 md:pb-9">
          <p data-aos="fade-right" className="text-xs md:text-sm opacity-75">
            You must see the contract on <span className="font-bold">blockchain</span> & see the source code on <span className="font-bold">github</span> to believe it.<br />
            Transparency is our main priority, so everyone can audit the contract & code.
          </p>
          <div data-aos="fade-right" className="flex gap-6 text-xs md:text-sm opacity-75 mt-6">
            <Link className="hover:font-semibold transition-all duration-300" href="https://sepolia.etherscan.io/address/0xD38862cc3A1Cd5757f70924E7F0146426e20cC2D">Contract Adrress</Link>
            <Link className="hover:font-semibold transition-all duration-300" href="https://sepolia.etherscan.io/address/0x29f19a33c3af612cb5248d2e208b1113d0898e5b">Contract Owner</Link>
            <Link className="hover:font-semibold transition-all duration-300" href="https://github.com/achmadfauzanhusain/supplyChainFarm-smartcontract">Source Code</Link>
          </div>
        </div>

        <div className="mt-28 md:mt-32 text-center">
          <h1 data-aos="fade-right" className={`${urbanist.className} text-4xl md:text-5xl font-bold bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}>Its Simple Like This :</h1>
          <p data-aos="fade-left" className="mt-4 font-medium text-sm sm:text-base opacity-75">
            Transparent <span className="text-[#38B2AC] opacity-100">Supply Chain</span> = trustworthy data + <br /> process efficiency + stronger reputation + protection <br /> from fraud.
            For example: food, medicine, or agricultural products can be tracked <br /> per batch and cannot be manipulated.
          </p>
        </div>

        <div className="mt-28 md:mt-32 px-4 lg:px-18">
          <div className="flex gap-8 md:gap-0 flex-col md:flex-row justify-evenly items-center">
            <div data-aos="fade-right">
              <Image className="w-[350px] md:w-[400px]" src="/photo/vitalik.png" width={400} height={400} alt="vitalik buterin" />
            </div>
            <div data-aos="fade-left" className={`${urbanist.className} max-w-lg text-left`}>
              <h1 className="text-3xl lg:text-4xl">“The great thing about <br /> blockchain is that once you <br /> understand it, you realize <br /> how much it can change <br />everything.”</h1>
              <p className="text-3xl lg:text-4xl mt-4 font-bold">- Vitalik Buterin</p>
            </div>
          </div>
        </div>

        <div className="mt-28 md:mt-32 text-center bg-blue-500 pt-4 pb-5">
          <p data-aos="fade-left" className="text-xl lg:text-2xl mt-4 font-semibold">
            {"Just 0.0005 ETH per ".split("").map((char, i) => (
              <span
                key={`line1-${i}`}
                className="
                  inline-block
                  transition-all duration-200 ease-out
                  hover:scale-[1.1] hover:rotate-3
                  origin-bottom
                  cursor-pointer
                "
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}

            <br className="sm:hidden" />

            {"product/batch".split("").map((char, i) => (
              <span
                key={`line2-${i}`}
                className="
                  inline-block
                  transition-all duration-200 ease-out
                  hover:scale-[1.1] hover:rotate-3
                  origin-bottom
                  cursor-pointer
                "
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-32 md:mt-44 text-center">
          <h1 data-aos="fade-right" className={`${urbanist.className} text-4xl md:text-5xl font-bold bg-linear-to-r from-[#0D6EFD] bg-clip-text inline-block to-white text-transparent`}>Prevent Counterfeiting <br className="" /> of Your Products</h1>
          <p data-aos="fade-left" className="px-8 sm:px-0 mt-4 text-sm sm:text-base font-medium opacity-75">Do you have a company or are you a supplier? You <br /> can make your product <span className="text-[#38B2AC] opacity-100">Supply Chain</span> transparent.</p>
          
          <div className="flex w-fit mx-auto items-center mt-6 gap-4 sm:gap-6">
            <Link data-aos="fade-right" href="/register" className="inline-block relative cursor-pointer transition-all duration-300 px-4 sm:px-6 py-3 rounded-lg text-white
              bg-linear-to-r from-[#0D6EFD] to-blue-600
              shadow-inner overflow-hidden
              hover:from-blue-400 hover:to-blue-500
              inset-shadow-sm inset-shadow-white/50 text-xs md:text-sm">
              <span className="relative z-10">Register Now</span>
              <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
            </Link>

            <Link data-aos="fade-right" href="/suppliers" className="inline-block relative cursor-pointer transition-all duration-300 px-4 sm:px-6 py-3 rounded-lg text-white
              bg-linear-to-r border border-white
              shadow-inner overflow-hidden
              hover:bg-white hover:border-black hover:text-black
              inset-shadow-sm inset-shadow-white/50 text-xs md:text-sm">
              <span className="relative z-10">See Suppliers</span>
              <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
            </Link>
          </div>
        </div>

        {/* footer */}
        <div className="mt-32 md:mt-44 px-4 sm:px-8 lg:px-18">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0">
            <div className="">
              <p className={`text-xl md:text-2xl font-bold`}>TBLO</p>
            </div>

            <div className="text-sm md:text-base x-28">
                <h3 className="text-xs md:text-sm opacity-75">
                  Built by Fauzan Husain – Fullstack JS & Blockchain Dev <br />
                  <Link className="hover:text-blue-300" href="https://fauzanhusain.com">Portfolio</Link> • <Link className="hover:text-blue-300" href="https://www.linkedin.com/in/achmadfauzanhusain/">LinkedIn</Link> • <Link className="hover:text-blue-300" href="https://github.com/achmadfauzanhusain">GitHub</Link>
                </h3>
            </div>
          </div>

          <div className="text-sm md:text-base x-28 mt-16">
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
