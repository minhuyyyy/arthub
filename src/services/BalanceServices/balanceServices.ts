import { apiService, handleApiResponse } from "../axios"

export const getUserBalance = async (userId: number) => {
    const res = await apiService.get(`/balance/${userId}`)
    return handleApiResponse(res.data)
}

export const getUserTransactions = async (userId: number) => {
    const res = await apiService.post(`/balance/history`, {
        accountId: userId
    })
    return handleApiResponse(res.data)
}
