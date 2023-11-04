import axios from "axios";
import { apis } from "../utils/apis";

export const OPEN_ADD_DIALOG = "OPEN_ADD_DIALOG";
export const GET_DOCUMENTS = "GET_DOCUMENTS";

export const getDocuments = async (dispatch) => {
    try {
        const response = await axios.get(apis.getDocuments);
        console.log(response.data)
        dispatch({
            type: GET_DOCUMENTS,
            payload: response.data.documents
        })
    } catch(error) {
        dispatch({
            type:GET_DOCUMENTS,
            payload: []
        })
    }
}