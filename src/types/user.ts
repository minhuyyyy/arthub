export type User = {
    isAuthenticated: boolean;
    isInitialised: boolean;
    userInfo: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        dob: string;
        phone: string;
        address: string;
        imageUrl: string;
        role: Roles;
    };
    
};

export enum Roles {
    admin = 1,
    user = 2,
    guest = 0,
}
