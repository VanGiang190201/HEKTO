import { instanceRequest } from './axiosClient';

export interface IAuthBody {
    email: string;
    password: string;
}

const authApi = {
    login(body: any) {
        const data = new FormData();
        data.append('email', body.email);
        data.append('password', body.password);
        const url = '/auth/login';
        return instanceRequest({
            url: url,
            method: 'POST',
            data,
        });
    },
};

export default authApi;
