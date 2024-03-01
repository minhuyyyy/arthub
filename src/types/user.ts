export type User = {
    isAuthenticated: boolean;
    isInitialised: boolean;
    userInfo: {
        id: string;
        username?: string;
        email: string;
        firstName?: string;
        lastName?: string;
        dob?: string;
        phone?: string;
        address?: string;
        imageUrl?: string;
        role: Roles;
    };
};

export enum Roles {
    user = 0,
    admin = 1,
    guest = 2,
}
