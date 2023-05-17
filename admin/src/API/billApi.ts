import { instanceRequest } from './axiosClient';

export interface IBillGet {}

const url = '/bill';

const billApi = {
    getAll() {
        return instanceRequest({
            url,
            method : 'GET'
        });
    },

    getDetail(order_id: number) {
        return instanceRequest({
             url : `${url}?order_id=${order_id}`,
             method : 'GET'
        });
    },
};

export default billApi;
