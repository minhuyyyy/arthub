import { AxiosResponse } from "axios"
import { apiService, handleApiResponse } from "../axios"

export const getUserProfile = async (userId: number): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.get(`/profile/${userId}`)
    return handleApiResponse(res)
}

export const getUserFollowersCount = async (userId: string): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.get(`/follow/followers-count/${userId}`)
    return handleApiResponse(res)
}

export const getUserFollowers = async (userId: string): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.get(`/follow/list-follower-id/${userId}`)
    return handleApiResponse(res)
}

export const updateProfile = async (userId: string, fullName: string, emailAddress: string, avatar: string): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.put(`/profile/${userId}`, {
        id: userId,
        fullName: fullName,
        emailAddress: emailAddress,
        avatar: avatar
    })
    return handleApiResponse(res, 'Profile updated successfully', res.data)
}

export const changePassword = async (emailAddress: string, newPassword: string, confirmPassword: string, token: string): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.post('/reset-password', {
        emailAddress: emailAddress,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        token: token
    })
    return handleApiResponse(res, 'Password changed successfully', res.data)
}

export const searchUserForAdmin = async (userEmail: string) => {
    const res = await apiService.get(`/admin/account?userEmail=${userEmail}`)
    return handleApiResponse(res)
}

export const
    followUser = async (artistId: number, followerId: number): Promise<AxiosResponse<any, any>> => {
        const res = await apiService.post('/follow', {
            artistId: artistId,
            followerId: followerId
        })
        return handleApiResponse(res)
    }

export const unfollowUser = async (artistId: number, followerId: number): Promise<AxiosResponse<any, any>> => {
    const res = await apiService.delete('/follow', {
        data: {
            artistId: artistId,
            followerId: followerId
        }
    })
    return handleApiResponse(res)
}