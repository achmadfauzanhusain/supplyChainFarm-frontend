import axios from "axios";
import callApi from "@/config/api";

const ROOT_API = "https://tblo-server.vercel.app";
const API_VERSION = "api/v1";

export async function registerSupplier(data) {
    const url = `${ROOT_API}/${API_VERSION}/supplier/register`;
    return callApi({
        url,
        method: "POST",
        data
    })
}

export async function registeredSuppliers() {
    const url = `${ROOT_API}/${API_VERSION}/supplier/registered`;
    return await callApi({
        url,
        method: "GET",
    });
}

export async function detailSupplier(data) {
  const url = `${ROOT_API}/${API_VERSION}/supplier/detail/${data}`;
  return await callApi({
    url,
    method: "GET",
  })
}

export async function searchSupplier(data) {
  const url = `${ROOT_API}/${API_VERSION}/supplier/search`;
  return await callApi({
    url,
    method: "POST",
    data
  })
}

// pinata
export async function uploadToPinata(metadata, tokenId) {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataContent: metadata,
        pinataMetadata: {
          name: `tblo-product-${tokenId}.json`,
        }
      },
      {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET
        }
      }
    );

    return `ipfs://${res.data.IpfsHash}`
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
}

export async function ipfsToHttp(uri) {
  if (!uri) return null;
  return uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
}