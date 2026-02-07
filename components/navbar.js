import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"]});

import { BrowserProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../abis/SupplyChainNFT.json";

import { notRegisteredSuppliers } from "@/services/supplier";
import { getAddress } from "ethers";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState(null);

  const [contract, setContract] = useState(null);
  const [isVerifiedSupplier, setIsVerifiedSupplier] = useState(false);
  const [isnVerfiedSuppliers, setIsnVerfiedSuppliers] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    const supplyChainNFT = new Contract(
      config[network.chainId].SupplyChainNFT.address,
      SupplyChainNFT,
      signer
    );
    setContract(supplyChainNFT);
  }

  const checkVerifiedSupplier = async (userAccount, scContract) => {
    if (!userAccount || !scContract) return;

    try {
      const isVerified = await scContract.verifiedSuppliers(userAccount);
      setIsVerifiedSupplier(isVerified);
    } catch (err) {
      console.error("checkVerifiedSupplier error:", err);
      setIsVerifiedSupplier(false);
    }
  }

  const checkNotVerifiedSuppliers = async (userAccount) => {
    if (!userAccount) return

    try {
      const notVerifiedSuppliersList = await notRegisteredSuppliers()
      const isNotVerified = notVerifiedSuppliersList.data.data.some(
        supplier =>
          supplier.ethWalletAddress.toLowerCase() === userAccount.toLowerCase()
      )
      setIsnVerfiedSuppliers(isNotVerified)
    } catch (err) {
      console.error("checkNotVerifiedSuppliers error:", err)
      setIsnVerfiedSuppliers(false)
    }
  }

  useEffect(() => {
    if (!window.ethereum) return;

    const loadAccount = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(getAddress(accounts[0]));
      } else {
        setAccount(null);
      }
    };

    loadAccount();
    loadBlockchainData();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(getAddress(accounts[0]));
      } else {
        setAccount(null);
        setIsVerifiedSupplier(false);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, [])

  useEffect(() => {
    if (account && contract) {
      checkVerifiedSupplier(account, contract)
      checkNotVerifiedSuppliers(account)
    }
  }, [account, contract])

  const renderSupplierStatusDesktop = () => {
    if(isnVerfiedSuppliers) {
      return (
        <div className="bg-orange-400 px-4 py-2 rounded-md hover:bg-orange-500 cursor-not-allowed">
          <h1>Being Processed!</h1>
        </div>
      )
    } else if(isVerifiedSupplier) {
      return (
        <Link href="/mint">
          <p className="text-[#38B2AC] font-semibold">{account.slice(0, 6) + '...' + account.slice(38, 42)}</p>
        </Link>
      )
    } else {
      return (
        <Link href="/register" className="relative cursor-pointer transition-all duration-300 px-6 py-2 rounded-lg text-white 
          bg-linear-to-r from-[#0D6EFD] to-blue-600
          shadow-inner overflow-hidden
          hover:from-blue-400 hover:to-blue-500
          inset-shadow-sm inset-shadow-white/5"
        >
          <span className="relative z-10">Register</span>
          <span className="absolute inset-0 bg-white opacity-20 blur-md translate-x-3 translate-y-3 rounded-lg"></span>
        </Link>
      )
    }
  }

  const renderSupplierStatusMobile = () => {
    if(isnVerfiedSuppliers) {
      return (
        <div className="bg-orange-400 p-2 rounded-md hover:bg-orange-500 cursor-not-allowed">
          <h1>Being Processed!</h1>
        </div>
      )
    } else if(isVerifiedSupplier) {
      return (
        <Link href="/mint">
          <p className="p-2 rounded-lg bg-green-600/30 text-[#38B2AC] font-semibold">{account.slice(0, 6) + '...' + account.slice(38, 42)}</p>
        </Link>
      )
    } else {
      return (
        <Link href="/register" className="p-2 rounded-lg hover:bg-white/20 bg-linear-to-r from-[#0D6EFD] to-blue-600 hover:from-blue-400 hover:to-blue-500" onClick={() => setIsOpen(false)}>
          Register
        </Link>
      )
    }
  }

  return (
    <div className="w-full text-white">
      <div className="flex justify-between items-center px-8 md:py-3">
        {/* Logo */}
        <h1 className="text-lg md:text-xl font-[1000]">TBLO</h1>

        {/* Desktop Menu */}
        <div className={`${urbanist.className} hidden md:flex items-center gap-10 text-base`}>
          <Link href="/owned" className="cursor-pointer hover:opacity-75 transition-all duration-300">
            Owned
          </Link>

          <Link href="/suppliers" className="cursor-pointer hover:opacity-75 transition-all duration-300">
            Suppliers
          </Link>

          {renderSupplierStatusDesktop()}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="cursor-pointer">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 h-full w-3/5 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-3/5 backdrop-blur-md bg-black/50 shadow-lg 
                    transition-transform duration-300 z-40
                    ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <X size={26} />
          </button>
        </div>

        {/* Drawer Menu */}
        <div className="flex flex-col px-8 pt-4 gap-6 text-base font-semibold">
          <Link href="/owned" className="p-2 rounded-lg hover:bg-white/20" onClick={() => setIsOpen(false)}>
            Owned
          </Link>

          <Link href="/suppliers" className="p-2 rounded-lg hover:bg-white/20" onClick={() => setIsOpen(false)}>
            Suppliers
          </Link>

          {renderSupplierStatusMobile()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;