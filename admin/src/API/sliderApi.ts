import { instanceRequest } from './axiosClient';

export interface ISliderCreate {
    title_carousel: string;
    description_carousel: string;
    image_carousel: any;
    active?: boolean;
}

export interface ISliderGet {
    id: number;
    title_carousel: string;
    description_carousel: string;
    image_carousel: any;
    active: boolean;
}

export interface ISliderPatch {
    title_carousel: string;
    description_carousel: string;
    image_carousel: any;
    active?: boolean;
}

const url = '/sliders';

const sliderApi = {
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

    getAllSlider() {
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

    editSlider(id: number, body: any) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'PATCH',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteSlider(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'DELETE',
        });
    },
};

export default sliderApi;
