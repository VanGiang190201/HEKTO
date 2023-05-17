import { instanceRequest } from './axiosClient';

export interface IOrderCreate {}

export interface IOrderGet {
    id: number;
    phone: string;
    first_name: string;
    last_name: string;
    address: string;
    apartment: string;
    city: string;
    user_id: number;
    time_order: string;
    status : number;
    total_order: number;
}

export interface IOrderPatch {}

const url = '/order';

const orderApi = {
    getAllOrder() {
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


    getDetail(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'GET'
        });
    },

    editActive(id: number, body: any) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'PATCH',
            data : body
        });
    },

    getProductsOrder(id: number) {
        return instanceRequest({
             url : `${url}/${id}/products-order`,
             method : 'GET'
        });
    },

    changeStatusOrder(id:  number, body : any) {
        return instanceRequest({
             url : `${url}/${id}/update-status`,
             method : 'PATCH',
             data : body,
        });
    },

    saveBill(id:  number, body : any) {
        return instanceRequest({
             url : `${url}/${id}/save-bill`,
             method : 'POST',
             data : body,
        });
    },

    cancelBill(id:  number, body : any) {
        return instanceRequest({
             url : `${url}/${id}/cancel-bill`,
             method : 'POST',
             data : body
        });
    }
};

export default orderApi;
