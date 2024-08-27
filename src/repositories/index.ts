import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
class HttpRepository {
    private client: AxiosInstance;
    constructor(baseURL: string, defaultHeaders: { [key: string]: string }) {
        this.client = axios.create({
            baseURL,
            headers: {
                ...defaultHeaders,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                return this.ReqInterceptorsController(config);
            },
            (err) => Promise.reject(err)
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (err: AxiosError) => {
                return this.ResInterceptorsController(err);
            }
        );
    }

    protected ReqInterceptorsController = (
        config: InternalAxiosRequestConfig<any>
    ) => {
        return config;
    };

    protected ResInterceptorsController = (err: AxiosError) => {
        return Promise.reject(err);
    };

    protected async get<M>(url: string, params: any): Promise<M> {
        const response: AxiosResponse = await this.client.get(url, {
            params: params,
        });
        return response.data;
    }

    protected async post<M>(url: string, data: any): Promise<M> {
        const response: AxiosResponse = await this.client.post(url, data);
        return response.data;
    }

    protected async put<M>(url: string, data: any): Promise<M> {
        const response: AxiosResponse = await this.client.put(url, data);
        return response.data;
    }

    protected async delete<M>(url: string): Promise<M> {
        const response: AxiosResponse = await this.client.delete(url);
        return response.data;
    }

    protected async patch<M>(url: string, data: any): Promise<M> {
        const response: AxiosResponse = await this.client.patch(url, data);
        return response.data;
    }

    protected async postFormData<M>(url: string, data: any): Promise<M> {
        const response: AxiosResponse = await this.client.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    protected async putFormData<M>(url: string, data: any): Promise<M> {
        const response: AxiosResponse = await this.client.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
}

export default HttpRepository;
