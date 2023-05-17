import { instanceRequest } from './axiosClient';
import { IListingGet } from './listingApi';
import { IUserGet } from './userApi';

export interface IBookingCreate {
    user: IUserGet;
    listing: IListingGet;
    status: string;
    startAt: string;
    endAt: string;
}

export interface IBookingNew {
    listingId: number;
    startAt: string;
    endAt: string;
}

export interface IBookingGet extends IBookingCreate {
    id: number;
}

export interface IBookingPatch extends IBookingCreate {}

const url = '/bookings';

const bookingApi = {
    create(body: IBookingCreate) {
        return instanceRequest.post(url, body);
    },

    getAllBooking() {
        return instanceRequest.get(url);
    },

    getBookingById(id: number) {
        return instanceRequest.get(`${url}/${id}`);
    },

    editBookingById(id: number, data: IBookingPatch) {
        return instanceRequest.patch(`${url}/${id}`, data);
    },

    deleteBookingById(id: number) {
        return instanceRequest.delete(`${url}/${id}`);
    },

    bookingNew(data: IBookingNew) {
        return instanceRequest.post(`${url}`, data);
    },
    myBooking() {
        return instanceRequest.get(`${url}/my`);
    },
    requestBooking() {
        return instanceRequest.get(`${url}/to-me`);
    },
    cancelBooking(id: number) {
        return instanceRequest.patch(`${url}/cancel/${id}`);
    },
    confirmBooking(id: number) {
        return instanceRequest.patch(`${url}/confirm/${id}`);
    },
};

export default bookingApi;
