import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../utils/urls'
const API_BASE_URL: string = API_URL

export const apiService = axios.create({
    baseURL: API_BASE_URL
})

export const handleApiResponse = (res: AxiosResponse, successMsg?: string, errorMsg?: string) => {
if (res.status === 200 || res.status === 201) {
        if (successMsg) {
            toast.success(successMsg)
        }
        return res
    } else {
        if (errorMsg) {
            return toast.error(errorMsg)
        } else return toast.error(res.data.title)
    }
}

