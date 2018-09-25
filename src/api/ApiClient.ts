import {HttpClient, HttpPromise} from './HttpClient';
import {ApiChannel, ApiUser, Map} from '@/types';

export class ApiClient {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public fetchChannels(): HttpPromise<ApiChannel[]> {
        return this.httpClient.get<ApiChannel[]>('/channels');
    }

    public fetchUsers(): HttpPromise<Map<ApiUser>> {
        return this.httpClient.get<Map<ApiUser>>('/users');
    }
}
