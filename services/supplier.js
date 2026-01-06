import axios from "axios";
import callApi from "@/config/api";
import { pinataApiKey, pinataApiSecret } from "../config"

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

export async function uploadToPinata(metadata, tokenId) {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataContent: metadata,
        pinataMetadata: {
          name: `metadata-${tokenId}.json`,
        }
      },
      {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
        }
      }
    );

    return `ipfs://${res.data.IpfsHash}`;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
}
