export type ArtworkType = {
    artworkId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    artistID: number;
    isBuyAvailable: boolean;
    artworkRating: number;
    artworkDate?: Date;
    genreId: number;
    likes?: {
        name: string;
    }[];
    membersRated: number[];
};
