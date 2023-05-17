import { instanceRequest } from './axiosClient';

export interface IAdsCreate {}

export interface IAdsGet {
    id: number;
    heading: string;
    title: string;
    description: string;
    image_first: string;
    image_second: string;
    is_used: boolean;
}

export interface IAdsPatch {}

const url = '/advetisements';

const adsApi = {
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

    getAllAds() {
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

    updateActive(id: number) {
        return instanceRequest({
            url: `${url}/${id}/active`,
            method: 'POST',
        });
    },

    getAd(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'GET',
        });
    },

    editAd(id: number, body: any) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteAd(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'DELETE',
        });
    },
};

export default adsApi;
