import { apiService, handleApiResponse } from "../axios"

export const login = async (emailAddress: string, accountPassword: string) => {
    const res = await apiService.post('/login', {
        emailAddress: emailAddress,
        accountPassword: accountPassword
    })
    return handleApiResponse(res)
}

export const register = async (email: string,
    fullname: string,
    password: string,
    confirmPassword: string) => {
    const res = await apiService.post('/register', {
        email: email,
        fullname: fullname,
        password: password,
        confirmPassword: confirmPassword
    })
    return handleApiResponse(res, 'Login successfully', 'Invalid email or password')

}