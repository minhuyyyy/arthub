import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../utils/urls'
const API_BASE_URL: string = API_URL

export const apiService = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem('accessToken')}`

    }
})

export const handleApiResponse = (res: AxiosResponse<any, any>, successMsg?: string, errorMsg?: string) => {
    if (res.status === 200 || res.status === 201) {
        if (successMsg) {
            toast.success(successMsg)
        }
        return res
    } else {
        if ((res.status === 401 || res.status === 404 || res.status === 500)) {
            if (errorMsg) {
                toast.error(errorMsg)
            } else toast.error(res.data.title)
        }
        return res
    }
}

