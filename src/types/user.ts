export type User = {
    isAuthenticated: boolean;
    isInitialised: boolean;
    userInfo: {
        id: number;
        fullName?: string;
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
    user = 2,
    admin = 1,
    guest = 0,
}
