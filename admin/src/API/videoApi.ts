import { instanceRequest } from './axiosClient';



export interface IVideoGet {
    id: number;
    name_product: string;
    title : string;
    media : string;
}


const url = '/videos';

const videoApi = {
    create(data: any) {
        console.log(data);
        
        return instanceRequest({
            url,
            method: 'POST',
            data,
        });
    },

    getVideos() {
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

   
    getDetail(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'GET',
        });
    },


    delete(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'DELETE',
        });
    },
};

export default videoApi;
