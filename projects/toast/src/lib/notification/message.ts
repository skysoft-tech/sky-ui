export interface Message {
    title: string;
    text: string;
    type: MessageType;
    timer?: number;
}

export type MessageType = 'info' | 'success' | 'error';
