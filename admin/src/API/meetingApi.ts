import { instanceRequest } from './axiosClient';


export interface IMeetingGet {
    id: number;
    user_id : number;
    display_name : string;
    phone : string;
    time_start: string;
    time_end : string;
    worker_id: number;
    worker_name : string;
    active : boolean
    
}


const url = '/meeting';

const meetingApi = {
    getAllMeeting() {
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


    getProducts(id: number) {
        return instanceRequest({
            url : `${url}/${id}/products`,
            method : 'GET'
        });
    },

    getDetail(id: number) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'GET'
        });
    },

    confirm(id: number , data : any) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'POST',
            data
        });
    },
};


export default meetingApi;
