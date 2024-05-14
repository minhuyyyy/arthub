import { Comment } from "./comment";

export type PostType = {
    postId: number;
    title: string;
    description: string;
    image: string;
    memberId?: number;
    isPublic?: boolean;
    artworkId: number;
    comments: Comment[];
};
