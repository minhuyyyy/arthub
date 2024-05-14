import { apiService, handleApiResponse } from "../axios"

export const submitReport = async (reportReason: string, artworkId: number, reporterId: number) => {
    const res = await apiService.post('/report', {
        reportReason: reportReason,
        artworkId: artworkId,
        reporterId: reporterId
    })
    return handleApiResponse(res)
}