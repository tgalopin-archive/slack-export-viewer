import {HttpCanceler, HttpClient, HttpPromise} from './HttpClient';
import {ApiChannel, ApiMessage, ApiUser, Map} from '@/types';

export class ApiClient {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public fetchUsers(): HttpPromise<Map<ApiUser>> {
        return this.httpClient.get<Map<ApiUser>>('/users');
    }

    public fetchChannels(): HttpPromise<ApiChannel[]> {
        return this.httpClient.get<ApiChannel[]>('/channels');
    }

    public fetchChannel(channel: string, canceler?: HttpCanceler): HttpPromise<ApiMessage[]> {
        return this.httpClient.get<ApiMessage[]>('/channels/' + channel, canceler);
    }
}
