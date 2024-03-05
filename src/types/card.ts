export type CardType = {
    artworkId: number;
    description: string;
    name: string;
    image: string;
    owner: {
        artistId: number;
        artistName: string;
        artistAvatar: string;
    };
    price: number;
    isBuyAvailable: boolean;
    savedBy: {
        name: string | null;
        userId: number;
    }[];
    purchasedBy: {
        userId: number;
    };
    comments: {
        id: string;
        displayName: string;
        comment: string;
        createdAt: string;
        userId: string;
    }[];
    likes: {
        userId: number;
        name: string;
    }[];
    artworkDate: string;
    genres: {
        id: string;
        genre?: string;
    }[];
};
