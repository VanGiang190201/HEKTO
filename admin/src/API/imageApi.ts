import { instanceRequest } from './axiosClient';



export interface IImageGet {
    id: number;
    name_product: string;
    code_id: string;
    image_product: string;
}


const url = '/images';

const imageApi = {
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

    getImages() {
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

    updateActiveSlider(id: number) {
        return instanceRequest({
            url: `${url}/${id}/active`,
            method: 'POST',
        });
    },
    getDetail(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'GET',
        });
    },


    deleteImage(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'DELETE',
        });
    },
};

export default imageApi;
