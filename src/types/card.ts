export type CardType = {
    _id: string;
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
        _id: string;
        displayName: string;
        comment: string;
        createdAt: string;
        userId: string;
    }[]; // Assuming comments are strings, could be a more complex object
    createdAt: string; // Assuming ISO 8601 format
    tags: {
        _id: string;
        tag?: string;
    }[];
    AIgenerated: boolean;
};
