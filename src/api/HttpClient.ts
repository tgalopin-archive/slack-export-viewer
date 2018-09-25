import axios, {AxiosPromise, AxiosRequestConfig, Canceler} from 'axios';

export type HttpConfig = AxiosRequestConfig;
export type HttpCanceler = ((cancel: Canceler) => void);
export type HttpPromise<T> = Promise<T>;

export class HttpClient {
    public get<T = any>(endpoint: string, canceler?: HttpCanceler, config?: HttpConfig): HttpPromise<T> {
        config = config || {};

        if (canceler) {
            config.cancelToken = new axios.CancelToken(canceler);
        }

        return this.wrapPromise<T>(axios.get('/api' + endpoint + '.json', config));
    }

    private wrapPromise<T>(axiosPromise: AxiosPromise<T>): HttpPromise<T> {
        return new Promise<T>((resolve, reject) => {
            axiosPromise
                .then((res) => {
                    if (res.status !== 200) {
                        reject();

                        return;
                    }

                    resolve(res.data);
                })
                .catch(() => {
                    reject();
                })
            ;
        });
    }
}
