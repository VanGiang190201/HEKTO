import { instanceRequest } from './axiosClient';

export interface IProductCreate {}

export interface IProductGet {
    id: number;
    name_products: string;
    description_product: string;
    name_product : string;
    price_product : number;
    category_id : string;
    rate : number;
    sale : number;
    image_product: string;
}

export interface IProductPatch {}

const url = '/products';

const productApi = {
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

    getAllProduct() {
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


    getProductById(id: number) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'GET'
        });
    },

    getOtherImage(id: number) {
        return instanceRequest({
             url : `${url}/${id}/other-images`, 
             method : 'GET'
        });
    },

    editProduct(id: number, body: any) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'PATCH',
             data  : body,
             headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteProduct(id: number) {
        return instanceRequest({
             url : `${url}/${id}`, 
             method : 'DELETE'
        });
    },
};

export default productApi;
