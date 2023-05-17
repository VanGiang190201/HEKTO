import { instanceRequest } from './axiosClient';

export interface IFeatureCreate {}

export interface IFeatureGet {
    id: number;
    name_feature: string;
    description_feature: string;
    image_feature: string;
    active: boolean;
}

export interface IFeaturePatch {}

const url = '/features';

const featuresApi = {
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

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },

    getAllFeature() {
        return instanceRequest({
            url,
            method: 'GET',
        });
    },

    getFeature(id: number) {
        return instanceRequest({
             url : `${url}/${id}`, 
             method :'GET'
        });
    },

    updateActive(id: number) {
        return instanceRequest({
             url : `${url}/${id}/active`,
             method : 'POST'
        });
    },

    editFeature(id: number, data: IFeaturePatch) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'PATCH',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteFeature(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'DELETE'
        });
    },
};

export default featuresApi;
