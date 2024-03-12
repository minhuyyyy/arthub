export type OrderType = {
    orderId: number;
    senderId: number;
    senderName: string;
    receiverId: number;
    receiverName: string;
    budget: number;
    message: string;
    status: Status;
};

export enum Status {
    'Pending' = 0,
    'In progress' = 1,
    'Completed' = 2,
    'Denied' = 3,
    'Waiting for deposit' = 4,
}
