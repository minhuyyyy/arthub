export type CardType = {
    artworkId: number;
    description: string;
    name: string;
    image: string;
    artistID: number;
    // owner: {
    //     artistName: string;
    //     artistAvatar: string;
    // };
    price: number;
    isBuyAvailable: boolean;
    likes: {
        userId: number;
        name: string;
    }[];
    artworkDate: string;
    genre: string;
};
