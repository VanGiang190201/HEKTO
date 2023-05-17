import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi, {
    IUserGet,
    IUserCreate,
    IUserPatch,
} from '../../../API/userApi';

const initialState: IUserGet[] = [
    {
        id: 1,
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
    },
];

export const createUser = createAsyncThunk(
    'user/create',
    async (data: IUserCreate, { rejectWithValue, dispatch }) => {
        try {
            const res = await userApi.create(data);
            console.log('response createUser> ', res);

            if (res.data) {
                dispatch(getUser());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getUser = createAsyncThunk(
    'user/getAll',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await userApi.getAllUser();
            console.log('response getAllUser> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const searchUser = createAsyncThunk(
    'user/searchUser',
    async (data: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await userApi.searchUser(data);
            console.log('response searchUser> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const getUserById = createAsyncThunk(
    'user/getById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await userApi.getUserById(id);
            console.log('response getAllUserById> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const editUserById = createAsyncThunk(
    'user/editById',
    async (
        dataEdit: { id: number; data: IUserPatch },
        { rejectWithValue, dispatch },
    ) => {
        const { id, data } = dataEdit;
        try {
            const res = await userApi.editUserById(id, data);
            console.log('response editAllUserById> ', res);

            if (res.data) {
                dispatch(getUser());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const deleteUserById = createAsyncThunk(
    'user/deleteById',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const res = await userApi.deleteUserById(id);
            console.log('response deleteUserById> ', res);

            if (res.data.affected === 1) {
                dispatch(getUser());
            }
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state: IUserGet[], action) => {
            const createdUser = action.payload;
            console.log('createdUser:', createdUser);
        });
        builder.addCase(createUser.rejected, (state: IUserGet[], action) => {
            console.log('createUser/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(getUser.fulfilled, (state: IUserGet[], action) => {
            const listUser = action.payload;
            console.log('listUser:', listUser);
            // state = [...listUser];
        });
        builder.addCase(getUser.rejected, (state: IUserGet[], action) => {
            console.log('getUser/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(searchUser.fulfilled, (state: IUserGet[], action) => {
            const searchUser = action.payload;
            console.log('searchUser:', searchUser);
        });
        builder.addCase(searchUser.rejected, (state: IUserGet[], action) => {
            console.log('searchUser/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(getUserById.fulfilled, (state: IUserGet[], action) => {
            const user = action.payload;
            console.log('specific user:', user);

            const indexOfUser = state.findIndex(
                (userItem) => userItem.id === user.id,
            );
            state[indexOfUser] = user;
        });
        builder.addCase(getUserById.rejected, (state: IUserGet[], action) => {
            console.log('getUserById/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(editUserById.fulfilled, (state: IUserGet[], action) => {
            const editedUser = action.payload;
            console.log('listUser:', editedUser);
        });
        builder.addCase(editUserById.rejected, (state: IUserGet[], action) => {
            console.log('editUserById/rejected:', action.payload);
        });
        //------------------------
        builder.addCase(
            deleteUserById.fulfilled,
            (state: IUserGet[], action) => {
                const deletePayload = action.payload;
                console.log('deletePayload:', deletePayload);
            },
        );
        builder.addCase(
            deleteUserById.rejected,
            (state: IUserGet[], action) => {
                console.log('deleteUserById/rejected:', action.payload);
            },
        );
    },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
