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
    pending = 0,
    processing = 1,
    completed = 2,
}
