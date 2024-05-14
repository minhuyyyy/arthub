import { AxiosResponse } from "axios"
import { apiService, handleApiResponse } from "../axios"

export const uploadArtwork = async (name: string, description: string, image: string, price: number, artistId: number, isPublic: boolean, isBuyAvailable: boolean, genreName: string) => {
    const res = await apiService.post('/artwork', {
        name: name,
        description: description,
        image: image,
        price: price,
        artistId: artistId,
        isPublic: isPublic,
        isBuyAvailable: isBuyAvailable,
        genreName: genreName
    })
    return handleApiResponse(res, 'Artwork posted successfully!', res.data.errors.Name[0])
}

export const getArtworks = async (page: number, pageSize: number) => {
    const res = await apiService.get(`/artwork?Page=${page}&PageSize=${pageSize}`)
    return handleApiResponse(res)
}

export const getUserOrders = async (userId: string) => {
    const res = await apiService.get(`/order/buyer/${userId}`)
    return handleApiResponse(res)
}

export const getArtworkById = async (artworkId: string): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.get(`/artwork/${artworkId}`)
    return handleApiResponse(res)
}

export const getArtworkByUserId = async (userId: number) => {
    const res = await apiService.get(`/artwork/artist/${userId}`)
    return handleApiResponse(res)
}

export const likeCard = async (userId: number, rating: number, artworkId: number): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.post('/rating', {
        userId: userId,
        rating: rating,
        artworkId: artworkId,
    })
    return handleApiResponse(res)
}

export const unlikeCard = async (userId: number, rating: number, artworkId: number) => {
    const res = await apiService.delete('/rating', {
        data: {
            userId: userId,
            rating: rating,
            artworkId: artworkId,
        }
    })
    return handleApiResponse(res)
}

export const deleteArtwork = async (artworkId: number) => {
    const res = await apiService.delete(`/artwork${artworkId}`)
    return handleApiResponse(res, 'Artwwork deleted successfully!', 'Failed to delete artwork')
}

export const getGenres = async () => {
    const res = await apiService.get('/genres')
    return handleApiResponse(res)
}

export const searchArtwork = async (searchStr: string) => {
    const res = await apiService.get(`/artwork?Query=${searchStr}`)
    return handleApiResponse(res)
}

export const buyArtwork = async (buyerId: number, totalQuantity: number, totalAmount: number, artworkId: number, unitPrice: number) => {
    const res = await apiService.post('/order', {
        artworkId: artworkId, unitPrice: unitPrice,
        buyerId: buyerId, totalAmount: totalAmount, totalQuantity: totalQuantity, orderDetails: [{
        }]
    })
    return handleApiResponse(res, 'Artwork bought!', res.data.msg)
}

// export const getUserBoughtArtworks = async()