import { instanceRequest } from './axiosClient';
import { IUserGet, IUserPatch } from './userApi';

export interface ICarCreate {
    brand: string;
    build: string;
    year: number;
    model: string;
    location: string;
    dayPrice: number;
    isFeatured: boolean;
}

export interface ICarGet extends ICarCreate {
    id: number;
    owner?: IUserGet;
    name: string;
}

export interface ICarPatch {
    brand?: string;
    build?: string;
    year?: number;
    model?: string;
    owner?: IUserPatch;
    location?: string;
    dayPrice?: number;
    isFeatured?: boolean;
}

const url = '/cars';

const carApi = {
    create(body: ICarCreate) {
        return instanceRequest.post(url, body);
    },

    getAllCar() {
        return instanceRequest.get(url);
    },

    searchCar(name: string) {
        return instanceRequest.get(`${url}/my?name=${name}`);
    },

    getCarById(id: number) {
        return instanceRequest.get(`${url}/${id}`);
    },

    editCarById(id: number, data: ICarPatch) {
        return instanceRequest.patch(`${url}/${id}`, data);
    },

    deleteCarById(id: number) {
        return instanceRequest.delete(`${url}/${id}`);
    },

    getMyCars() {
        return instanceRequest.get(`${url}/my`);
    },
};

export default carApi;
