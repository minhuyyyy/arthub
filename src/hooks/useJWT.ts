import { JwtPayload, jwtDecode } from 'jwt-decode';
export const decodeToken = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
};
