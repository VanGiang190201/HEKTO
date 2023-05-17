import { instanceRequest } from './axiosClient';



export interface IStatisticalGet {
    
    
}


const url = '/statistical';

const statisticalApi = {
    getAll() {
        return instanceRequest({
            url,
            method : 'GET'
        });
    },
};


export default statisticalApi;
