import { instanceRequest } from './axiosClient';

export interface IWorkerCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IWorkerGet {
    id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
    role: number;
    avatar: string;
    display_name: string;
    password: string;
}

export interface IWorkerPatch {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password?: string;
}

const url = '/worker';

const workerApi = {
    create(body: any) {
        // const url = '/users';
        return instanceRequest({
            url,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // searchUser(email: string) {
    //     return instanceRequest.get(`${url}?email=${email}`);
    // },

    getAllWorker() {
        return instanceRequest({
            url,
            method: 'GET',
        });
    },

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },

    getWorker(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'GET',
        });
    },

    updateWorker(id: number, data: any) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'PATCH',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteWorker(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'DELETE'
        });
    },
};

export default workerApi;
