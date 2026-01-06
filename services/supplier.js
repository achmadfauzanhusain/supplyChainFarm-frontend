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