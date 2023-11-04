import { apiUrl } from "./config";

export const apis = {
    getDocuments: apiUrl + "/get_documents",
    uploadFile: apiUrl + "/upload_file",
    uploadUrl: apiUrl + "/upload_url",
    uploadText: apiUrl + "/upload_text",
    ask: apiUrl + "/ask",
    delete: apiUrl + "/delete"
}