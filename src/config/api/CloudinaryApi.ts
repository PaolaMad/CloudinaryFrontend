import { API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE } from "@env";
import axios from "axios";
import { Platform } from "react-native";

export const API_URL = STAGE === 'production' ? PROD_URL : Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

const CloudinaryApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export { CloudinaryApi }