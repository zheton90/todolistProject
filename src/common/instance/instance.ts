import axios from "axios";

// const token = '7c3b1c69-42a4-4f2c-8b45-40df71997c8a'
// const apiKey = '06d111ff-85bc-439c-affb-c02f18405c0b'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        "API-KEY": import.meta.env.VITE_API_KEY,
    },
})