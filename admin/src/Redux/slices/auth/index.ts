import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi, { IAuthBody } from '../../../API/authApi';
import { setStoredAuth } from '../../../Utils/helper/localStorage';
interface AuthState {
    access_Token: string;
    id: number;
    email: string;
    display_name : string;
    role : number;
}
const initialState: AuthState = {
    access_Token: '',
    id: 1,
    email: '',
    display_name : '',
    role : 0
};

export const login = createAsyncThunk(
    'auth/login',
    async (body: any, { rejectWithValue, dispatch }) => {
        try {
            const res = await authApi.login(body);
            console.log('response login> ', res);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state: AuthState, action) => {
            setStoredAuth(action.payload.access_token);
            const tokenFromPayload = action.payload.access_token;
            console.log('tokenFromPayload: ', action.payload.access_token);
            state.access_Token = tokenFromPayload;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.display_name = action.payload.display_name;
            state.role = action.payload.role;
        });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
