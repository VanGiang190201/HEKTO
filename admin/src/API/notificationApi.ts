import { instanceRequest } from './axiosClient';



export interface IImageGet {
    id: number;
    name_product: string;
    code_id: string;
    image_product: string;
}


const url = '/notification';

const notificationApi = {
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
 
};

export default notificationApi;
