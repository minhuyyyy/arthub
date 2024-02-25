import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';

const initialState: User = {
    isAuthenticated: false,
    userInfo: {
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        address: '',
        imageUrl: '',
        role: 0,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
