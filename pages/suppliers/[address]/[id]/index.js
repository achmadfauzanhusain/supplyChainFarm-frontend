import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

import { BrowserProvider, JsonRpcProvider, Contract } from "ethers";
import config from "@/config.json";
import SupplyChainNFT from "../../../../abis/SupplyChainNFT.json";

import { ipfsToHttp } from "@/services/supplier";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct = () => {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState("");
  const [product, setProduct] = useState({});
  const [metadata, setMetadata] = useState(null);

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingMetadata, setLoadingMetadata] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const isOwner =
    signer &&
    product?.currentHolder &&
    signer.toLowerCase() === product.currentHolder.toLowerCase();

  const getReadOnlyProvider = () => {
    return new JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
    );
  };

  const connectWalletIfAny = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer.address);
    } catch {
    }
  };

  const loadBlockchainData = async () => {
    try {
      const provider = getReadOnlyProvider();
      const network = await provider.getNetwork();

      const supplyChainNFT = new Contract(
        config[network.chainId].SupplyChainNFT.address,
        SupplyChainNFT,
        provider
      );

      setContract(supplyChainNFT);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blockchain");
      setLoadingProduct(false);
    }
  };

  const fetchDetailProduct = async () => {
    if (!contract || !id) return;

    try {
      const data = await contract.products(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product");
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    loadBlockchainData();
    connectWalletIfAny();
  }, []);

  useEffect(() => {
    if (!router.isReady || !contract) return;
    fetchDetailProduct();
  }, [router.isReady, contract, id]);

  useEffect(() => {
    if (!product?.metadataURI) return;

    const fetchMetadata = async () => {
      try {
        const url = ipfsToHttp(product.metadataURI);
        const res = await axios.get(url);
        setMetadata(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch metadata");
      } finally {
        setLoadingMetadata(false);
      }
    };

    fetchMetadata();
  }, [product?.metadataURI]);
  return (
    <div className="mt-10 md:mt-18 px-2 sm:px-8 lg:px-18 pb-8">
      <button className="cursor-pointer" onClick={() => router.back()}>
        <Image src="/icon/back.png" width={30} height={30} alt="back" />
      </button>

      <div className="flex justify-between items-center mt-8">
        <h1 className={`${urbanist.className} text-3xl font-bold`}>
          {loadingProduct ? (
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse" />
          ) : (
            product?.name
          )}
        </h1>

        <div>
          <p className="text-xs opacity-75 font-semibold">tokenId</p>
          {loadingProduct ? (
            <div className="h-8 w-16 bg-gray-300 rounded animate-pulse" />
          ) : (
            <h2 className="text-2xl font-bold">#{id}</h2>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xs opacity-75 font-semibold">batch</p>
          {loadingProduct ? (
            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse" />
          ) : (
            <h2 className="text-2xl font-bold">
              #{product?.batch_number}
            </h2>
          )}
        </div>

        {isOwner && (
          <Link
            href={`/suppliers/${product?.supplier}/${id}/edit-status`}
            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 text-xs"
          >
            edit status
          </Link>
        )}
      </div>

      {/* DATA GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
        <Info label="quantity" loading={loadingProduct}>
          {Number(product?.quantity_kg)}kg
        </Info>
        <Info label="origin" loading={loadingProduct}>
          {product?.origin}
        </Info>
        <Info label="production date" loading={loadingMetadata}>
          {metadata?.productionDate}
        </Info>
        <Info label="current status" loading={loadingProduct}>
          {product?.currentStatus}
        </Info>
        <Info label="supplier" loading={loadingProduct}>
          {product?.supplier?.slice(0, 6)}...
        </Info>
        <Info label="holder" loading={loadingProduct}>
          {product?.currentHolder?.slice(0, 6)}...
        </Info>
      </div>

      <div className="mt-14">
        <h2 className="text-sm font-semibold">Description</h2>
        {loadingMetadata ? (
          <div className="space-y-2 animate-pulse mt-2">
            <div className="h-3 bg-gray-300 rounded" />
            <div className="h-3 bg-gray-300 rounded w-5/6" />
          </div>
        ) : (
          <p className="text-xs opacity-75 mt-1">
            {metadata?.description}
          </p>
        )}
      </div>
    </div>
  );
};

const Info = ({ label, loading, children }) => (
  <div className="bg-[#BEE3F8]/25 py-3 px-3 rounded-lg">
    <h2 className="text-sm font-bold">{label}</h2>
    {loading ? (
      <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mt-1" />
    ) : (
      <p className="text-xs opacity-75">{children}</p>
    )}
  </div>
);

export default DetailProduct;