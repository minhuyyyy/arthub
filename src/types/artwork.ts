import { GenreType } from './genre';

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
    genre: GenreType;
    likes?: {
        name: string;
    }[];
    membersRated: number[];
};
