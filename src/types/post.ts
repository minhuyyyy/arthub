export type PostType = {
    postId: number;
    title: string;
    description: string;
    image: string;
    memberId?: number;
    isPublic?: boolean;
    artworkId: number;
    comments: {
        memberName: string;
        commentId: number;
        content: string;
        memberId: number;
        memberAvatar: string;
    }[];
};
