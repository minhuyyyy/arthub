export type CardType = {
    id: string;
    imgDescription: string;
    imgLink: string;
    owner: {
        name: string;
        userId: string;
    };
    savedBy: {
        name: string | null;
        userId: string;
    }[];
    owns: boolean;
    hasSaved: boolean;
    comments: {
        id: string;
        displayName: string;
        comment: string;
        createdAt: string;
        userId: string;
    }[];
    likes: {
        userId: string;
    }[];
    createdAt: string;
    tags: {
        id: string;
        tag?: string;
    }[];
    AIgenerated: boolean;
};
