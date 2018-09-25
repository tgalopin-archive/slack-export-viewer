export interface Map<V> {
    [key: string]: V;
}

export interface ApiChannel {
    id: string;
    name: string;
    created: number;
    creator: string;
    members_count: number;
    purpose: string;
    is_archived: boolean;
}

export interface ApiUser {
    name: string;
    real_name: string;
    picture: number;
    is_deleted: boolean;
}

export interface ApiMessage {
    user: string;
    text: string;
    ts: number;
}
