import { apiService, handleApiResponse } from "../axios"

export const uploadPost = async (title: string, description: string, memberId: number, artworkId: number) => {
    const res = await apiService.post('/post', {
        title: title,
        description: description,
        memberId: memberId,
        artworkId: artworkId
    })
    return handleApiResponse(res, 'Post created successfully!', res.data.errors.Name[0])
}

export const getPostById = async (postId: number) => {
    const res = await apiService.get(`/post/${postId}`)
    return handleApiResponse(res.data)
}

export const updatePost = async (title: string, description: string, postId: number) => {
    const res = await apiService.put(`/post/${postId}`, {
        title: title,
        description: description,
        postId: postId
    })
    return handleApiResponse(res, 'Post updated successfully!', res.data.errors.Name[0])
}

export const postComment = async (content: string, postId: number, memberId: number) => {
    const res = await apiService.post('/comment', { content: content, postId: postId, memberId: memberId })
    return handleApiResponse(res)
}

export const deleteComment = async (commentId: number) => {
    const res = await apiService.delete(`/comment/${commentId}`)
    return handleApiResponse(res, 'Comment deleted successfully!', 'Failed to delete comment')
}

export const updateComment = async (commentId: number, content: string) => {
    const res = await apiService.put(`/comment/${commentId}`, {
        commentId: commentId,
        content: content
    })
    return handleApiResponse(res, 'Comment updated successfully!', 'Failed to update comment')
}

export const getPostsByUserId = async (userId: number) => {
    const res = await apiService.get(`/post/user/${userId}`)
    return handleApiResponse(res.data.items)
}