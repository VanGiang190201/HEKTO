import { instanceRequest } from './axiosClient';

export interface IUserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserGet {
    id: number;
    user_name : string;
    first_name: string;
    last_name: string;
    email : string;
    phone : string;
    birthday: string;
    address: string;
    display_name : string;
    avatar : string;
}

export interface IUserPatch {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password?: string;
}

const url = '/customer';

const userApi = {
    
    // searchUser(email: string) {
    //     return instanceRequest.get(`${url}?email=${email}`);
    // },

    getAllCustomer() {
        return instanceRequest({
            url : url,
            method : 'GET'
        });
    },

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },

    getUserById(id: number) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'GET'
        });
    },
};

export default userApi;
