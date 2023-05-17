import { instanceRequest } from './axiosClient';

export interface ICategoryCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ICategoryGet {
    id: number;
    name_categories: string;
    description_categories: string;
    portfolios_id: string;
    image: string;
}

export interface ICategoryPatch {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password?: string;
}

const url = '/category';

const categoryApi = {
    create(body: any) {
        return instanceRequest({
            url,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getAllCategory() {
        return instanceRequest({
            url,
            method : 'GET'
        });
    },

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },

    getDetailCategory(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'GET'
        });
    },

    editCategory(id: number, body: any) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'PATCH',
             data : body ,
             headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteCategory(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'DELETE'
        });
    },
};

export default categoryApi;
