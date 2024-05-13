import { apiService, handleApiResponse } from "../axios"

export const getUserProfile = async (userId: number) => {
    const res = await apiService.get(`/profile/${userId}`)
    return handleApiResponse(res.data)
}

export const getUserFollowersCount = async (userId: number) => {
    const res = await apiService.get(`/follow/followers-count/${userId}`)
    return handleApiResponse(res.data.followersCount)
}

export const getFollowers = async (userId: number) => {
    const res = await apiService.get(`/follow/list-follower-id/${userId}`)
    return handleApiResponse(res.data.listFollowerId)
}

export const updateProfile = async (userId: number, fullName: string, emailAddress: string, avatar: string) => {
    const res = await apiService.put(`/profile/${userId}`, {
        id: userId,
        fullName: fullName,
        emailAddress: emailAddress,
        avatar: avatar
    })
    return handleApiResponse(res, 'Profile updated successfully', res.data)
}

export const changePassword = async (emailAddress: string, newPassword: string, confirmPassword: string, token: string) => {
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
    return handleApiResponse(res.data.accountId)
}