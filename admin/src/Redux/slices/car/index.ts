import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import carApi, { ICarCreate, ICarGet, ICarPatch } from '../../../API/carApi';

const initialState: ICarGet[] = [
    {
        id: 2,
        brand: '',
        name: '',
        build: '',
        year: 2019,
        model: '',
        location: '',
        dayPrice: 40,
        isFeatured: true,
        owner: {
            id: 4,
            firstName: '',
            lastName: '',
            birthday: '',
            email: '',
        },
    },
];

export const createCar = createAsyncThunk(
    'car/create',
    async (data: ICarCreate, { rejectWithValue, dispatch }) => {
        try {
            const res = await carApi.create(data);
            console.log('response createCar> ', res);

            if (res.data) {
                dispatch(getCar());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getCar = createAsyncThunk(
    'car/getAll',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await carApi.getAllCar();
            console.log('response getAllCar> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const searchCar = createAsyncThunk(
    'car/searchCar',
    async (data: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await carApi.searchCar(data);
            console.log('response searchCar> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getCarById = createAsyncThunk(
    'car/getById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await carApi.getCarById(id);
            console.log('response getAllCarById> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const editCarById = createAsyncThunk(
    'car/editById',
    async (
        dataEdit: { id: number; data: ICarPatch },
        { rejectWithValue, dispatch },
    ) => {
        const { id, data } = dataEdit;
        try {
            const res = await carApi.editCarById(id, data);
            console.log('response editAllCarById> ', res);

            if (res.data) {
                dispatch(getCar());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const deleteCarById = createAsyncThunk(
    'car/deleteById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await carApi.deleteCarById(id);
            console.log('response deleteCarById> ', res);

            if (res.data.affected === 1) {
                dispatch(getCar());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        resetCar: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createCar.fulfilled, (state: ICarGet[], action) => {
            const createdCar = action.payload;
            console.log('createdCar:', createdCar);
        });
        builder.addCase(createCar.rejected, (state: ICarGet[], action) => {
            console.log('createCar/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(getCar.fulfilled, (state: ICarGet[], action) => {
            const listCar = action.payload;
            console.log('listCar:', listCar);
            // state = [...listCar];
        });
        builder.addCase(getCar.rejected, (state: ICarGet[], action) => {
            console.log('getCar/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(searchCar.fulfilled, (state: ICarGet[], action) => {
            const listCar = action.payload;
            console.log('search:', listCar);
            // state = [...listCar];
        });
        builder.addCase(searchCar.rejected, (state: ICarGet[], action) => {
            console.log('searchCar/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(getCarById.fulfilled, (state: ICarGet[], action) => {
            const car = action.payload;
            console.log('specific Car:', car);

            const indexOfCar = state.findIndex(
                (carItem) => carItem.id === car.id,
            );
            state[indexOfCar] = car;
        });
        builder.addCase(getCarById.rejected, (state: ICarGet[], action) => {
            console.log('getCarById/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(editCarById.fulfilled, (state: ICarGet[], action) => {
            const editedCar = action.payload;
            console.log('listCar:', editedCar);
        });
        builder.addCase(editCarById.rejected, (state: ICarGet[], action) => {
            console.log('editCarById/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(deleteCarById.fulfilled, (state: ICarGet[], action) => {
            const deletePayload = action.payload;
            console.log('deletePayload:', deletePayload);
        });
        builder.addCase(deleteCarById.rejected, (state: ICarGet[], action) => {
            console.log('deleteCarById/rejected:', action.payload);
        });
    },
});
export const { resetCar } = carSlice.actions;
export default carSlice.reducer;
