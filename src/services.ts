import {ApiClient} from './api/ApiClient';
import {HttpClient} from './api/HttpClient';

export const api = new ApiClient(new HttpClient());
