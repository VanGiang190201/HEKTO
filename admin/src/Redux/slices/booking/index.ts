import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingApi, {
    IBookingCreate,
    IBookingGet,
    IBookingPatch,
} from '../../../API/bookingApi';

const initialState: IBookingGet[] = [
    {
        id: 123,
        status: ' ',
        startAt: ' ',
        endAt: ' ',
        user: {
            id: 123,
            firstName: ' ',
            lastName: ' ',
            birthday: ' ',
            email: ' ',
        },
        listing: {
            id: 1,
            startAt: ' ',
            endAt: ' ',
            days_available: 0,
            car: {
                id: 2,
                brand: ' ',
                name: '',
                build: ' ',
                year: 2019,
                model: ' ',
                location: ' ',
                dayPrice: 40,
                isFeatured: true,
            },
        },
    },
];

export const createBooking = createAsyncThunk(
    'booking/create',
    async (data: IBookingCreate, { rejectWithValue, dispatch }) => {
        try {
            const res = await bookingApi.create(data);
            console.log('response createBooking> ', res);

            if (res.data) {
                dispatch(getBooking());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getBooking = createAsyncThunk(
    'booking/getAll',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await bookingApi.getAllBooking();
            console.log('response getAllBooking> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getBookingById = createAsyncThunk(
    'booking/getById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await bookingApi.getBookingById(id);
            console.log('response getBookingById> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const editBookingById = createAsyncThunk(
    'booking/editById',
    async (
        dataEdit: { id: number; data: IBookingPatch },
        { rejectWithValue, dispatch },
    ) => {
        const { id, data } = dataEdit;
        try {
            const res = await bookingApi.editBookingById(id, data);
            console.log('response editBookingById> ', res);

            if (res.data) {
                dispatch(getBooking());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const deleteBookingById = createAsyncThunk(
    'booking/deleteById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await bookingApi.deleteBookingById(id);
            console.log('response deleteBookingById> ', res);

            if (res.data.affected === 1) {
                dispatch(getBooking());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        resetBooking: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createBooking.fulfilled,
            (state: IBookingGet[], action) => {
                const createdBooking = action.payload;
                console.log('createdBooking:', createdBooking);
            },
        );
        builder.addCase(
            createBooking.rejected,
            (state: IBookingGet[], action) => {
                console.log('createListing/rejected:', action.payload);
            },
        );
        //------------------------
        builder.addCase(
            getBooking.fulfilled,
            (state: IBookingGet[], action) => {
                const listBooking = action.payload;
                console.log('listBooking:', listBooking);
                // state = [...listBooking];
            },
        );
        builder.addCase(getBooking.rejected, (state: IBookingGet[], action) => {
            console.log('getBooking/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(
            getBookingById.fulfilled,
            (state: IBookingGet[], action) => {
                const booking = action.payload;
                console.log('specific booking:', booking);

                const indexOfUser = state.findIndex(
                    (bookingItem) => bookingItem.id === booking.id,
                );
                // state[indexOfUser] = booking;
            },
        );
        builder.addCase(
            getBookingById.rejected,
            (state: IBookingGet[], action) => {
                console.log('getUserById/rejected:', action.payload);
            },
        );
        //------------------------
        builder.addCase(
            editBookingById.fulfilled,
            (state: IBookingGet[], action) => {
                const editedUser = action.payload;
                console.log('listUser:', editedUser);
            },
        );
        builder.addCase(
            editBookingById.rejected,
            (state: IBookingGet[], action) => {
                console.log('editBookingById/rejected:', action.payload);
            },
        );
        //------------------------
        builder.addCase(
            deleteBookingById.fulfilled,
            (state: IBookingGet[], action) => {
                const deletePayload = action.payload;
                console.log('deletePayload:', deletePayload);
            },
        );
        builder.addCase(
            deleteBookingById.rejected,
            (state: IBookingGet[], action) => {
                console.log('deleteBookingById/rejected:', action.payload);
            },
        );
    },
});
export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
