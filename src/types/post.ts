export type PostType = {
    postId: number;
    title: string;
    description: string;
    image: string;
    memberId?: number;
    artworkId: number;
    comments: [];
};
