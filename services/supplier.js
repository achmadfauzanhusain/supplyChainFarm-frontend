import axios from "axios";
import callApi from "@/config/api";

const ROOT_API = "http://localhost:8000";
const API_VERSION = "api/v1";

export async function registerSupplier(data) {
    const url = `${ROOT_API}/${API_VERSION}/supplier/register`;
    return callApi({
        url,
        method: "POST",
        data
    })
}